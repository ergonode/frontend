/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FeedbackProvider
        :errors="errors"
        :change-values="changeValues">
        <template #default="{ hasValueToSave }">
            <Button
                data-cy="submit"
                :title="$t('@Users._.submit')"
                :disabled="!isAllowedToUpdate"
                @click.native="onSubmit">
                <template #prepend="{ color }">
                    <IconSpinner
                        v-if="isSubmitting"
                        :fill-color="color" />
                    <IconSync
                        v-else-if="hasValueToSave"
                        :fill-color="color" />
                </template>
            </Button>
        </template>
    </FeedbackProvider>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import updateButtonFeedbackMixin from '@Core/mixins/feedback/updateButtonFeedbackMixin';
import PRIVILEGES from '@Users/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UpdateLanguageRestrictionsButton',
    mixins: [
        updateButtonFeedbackMixin,
    ],
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('user', [
            'drafts',
            'languagePrivilegesCollection',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER.update,
            ]);
        },
    },
    methods: {
        ...mapActions('user', [
            'updateUser',
            '__setState',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }

            const isAnyReadPrivilege = Object.keys(this.languagePrivilegesCollection)
                .some(languageCode => Object.keys(this.languagePrivilegesCollection[languageCode])
                    .filter(privilege => privilege === 'read')
                    .some((privilege) => {
                        if (typeof this.drafts[`${languageCode}/${privilege}`] === 'undefined') {
                            return this.languagePrivilegesCollection[languageCode][privilege];
                        }

                        return this.drafts[`${languageCode}/${privilege}`];
                    }));

            if (isAnyReadPrivilege) {
                this.isSubmitting = true;

                this.removeScopeErrors(this.scope);
                this.updateUser({
                    scope: this.scope,
                    onSuccess: this.onUpdateSuccess,
                    onError: this.onUpdateError,
                });
            } else {
                this.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.$t('@Users.user.components.UpdateLanguageRestrictionsButton.updateLanguageValidation'),
                });
            }
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Users.user.components.UpdateLanguageRestrictionsButton.updateLanguageSuccess'),
            });

            this.__setState({
                key: 'drafts',
                value: {},
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
