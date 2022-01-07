/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Users.profile.components.UserAvatarForm.title')"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :disabled="!isAllowedToUpdate"
        :errors="errors"
        :change-values="changeValues"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <UploadFile
                    :value="Boolean(avatarId) || Boolean(avatarFile)"
                    accept-files="image/*"
                    :label="$t('@Users.profile.components.UserAvatarForm.uploadLabel')"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors.upload"
                    height="152px"
                    @remove="onRemoveAvatar"
                    @upload="onUploadAvatarFile">
                    <template #file>
                        <StaticImage
                            v-if="avatarFile"
                            :src="avatarFileSource"
                            :alt="$t('@Users.profile.components.UserAvatarForm.uploadAlt')" />
                        <LazyImage
                            v-else
                            :use-cache="false"
                            :value="avatarId"
                            :href="`${languageCode}/accounts/${avatarId}/avatar`" />
                    </template>
                </UploadFile>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import PRIVILEGES from '@Users/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UserAvatarForm',
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('user', {
            avatarId: state => state.avatarId,
            avatarFile: state => state.avatarFile,
            languageCode: state => state.languageCode,
        }),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER.update,
            ]);
        },
        avatarFileSource() {
            return URL.createObjectURL(this.avatarFile);
        },
    },
    methods: {
        ...mapActions('user', [
            '__setState',
        ]),
        onRemoveAvatar() {
            this.__setState({
                key: 'avatarId',
                value: null,
            });
            this.__setState({
                key: 'avatarFile',
                value: null,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'avatarFile',
                value: null,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'avatarId',
                value: null,
            });
        },
        onUploadAvatarFile(value) {
            this.__setState({
                key: 'avatarFile',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'avatarFile',
                value,
            });
        },
    },
};
</script>
