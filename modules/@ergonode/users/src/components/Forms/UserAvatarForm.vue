/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="User avatar"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <UploadFile
                    :value="Boolean(avatarId) || Boolean(avatarFile)"
                    accept-files="image/*"
                    label="Profile picture"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors.upload"
                    height="152px"
                    @remove="onRemoveAvatar"
                    @upload="onUploadAvatarFile">
                    <template #file>
                        <StaticImage
                            v-if="avatarFile"
                            :src="avatarFileSource"
                            alt="User avatar" />
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
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import UploadFile from '@Media/components/Inputs/UploadFile/UploadFile';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import LazyImage from '@UI/components/LazyImage/LazyImage';
import StaticImage from '@UI/components/StaticImage/StaticImage';
import PRIVILEGES from '@Users/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UserAvatarForm',
    components: {
        UploadFile,
        LazyImage,
        StaticImage,
        Form,
        FormSection,
    },
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
