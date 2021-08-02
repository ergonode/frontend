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
                :title="$t('@Core._.buttons.submit')"
                :floating="floating"
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
import PRIVILEGES from '@Core/config/privileges';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import updateButtonFeedbackMixin from '@Core/mixins/feedback/updateButtonFeedbackMixin';
import {
    getParsedTree,
} from '@Core/models/mappers/treeDesignerMapper';
import {
    Z_INDEX_LVL_2,
} from '@UI/assets/scss/_js-variables/indexes.scss';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UpdateLanguagesInheritanceButton',
    mixins: [
        updateButtonFeedbackMixin,
    ],
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('core', [
            'inheritedLanguagesTree',
        ]),
        floating() {
            return {
                bottom: '24px',
                right: '24px',
                zIndex: Z_INDEX_LVL_2,
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.update,
            ]);
        },
    },
    methods: {
        ...mapActions('core', [
            'setLanguageTree',
            'updateLanguageTree',
        ]),
        ...mapActions('authentication', [
            'getUser',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }

            if (this.inheritedLanguagesTree.length) {
                this.isSubmitting = true;

                const [
                    languages,
                ] = getParsedTree({
                    data: this.inheritedLanguagesTree,
                    childrenId: 'language_id',
                });

                this.removeScopeErrors(this.scope);

                this.updateLanguageTree({
                    languages,
                    onSuccess: () => this.onUpdateSuccess(languages),
                    onError: this.onUpdateError,
                });
            } else {
                this.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.$t('@Core.core.components.UpdateLanguagesInheritanceButton.warningMessage'),
                });
            }
        },
        async onUpdateSuccess(languages) {
            this.setLanguageTree(languages);

            await this.getUser({
                onSuccess: this.onGetUserSuccess,
            });
        },
        onUpdateError(message) {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: message.errors.languages,
            });
            this.isSubmitting = false;
        },
        onGetUserSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Core.core.components.UpdateLanguagesInheritanceButton.successMessage'),
            });
            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
    },
};
</script>
