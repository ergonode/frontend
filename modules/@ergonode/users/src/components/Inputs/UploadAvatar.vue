/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadFile
        :value="Boolean(value)"
        accept-files="image/*"
        :request-pending="isRequestPending"
        :label="label"
        :required="required"
        :disabled="disabled"
        :height="height"
        @remove="onRemoveFile"
        @upload="onAvatarUpload">
        <template #file>
            <Picture
                :use-cache="false"
                :value="value"
                :api-path="`${languageCode}/accounts/${value}/avatar`" />
        </template>
    </UploadFile>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import UploadFile from '@Media/components/Inputs/UploadFile/UploadFile';
import Picture from '@UI/components/Picture/Picture';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UploadAvatar',
    components: {
        UploadFile,
        Picture,
    },
    props: {
        label: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
        userId: {
            type: String,
            required: true,
        },
        languageCode: {
            type: String,
            required: true,
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        height: {
            type: String,
            default: '136px',
        },
    },
    data() {
        return {
            isRequestPending: false,
        };
    },
    methods: {
        ...mapActions('feedback', [
            'onError',
            'removeError',
        ]),
        onRemoveFile() {
            this.$axios.$delete(`${this.languageCode}/accounts/${this.userId}/avatar`, {
                withLanguage: false,
            }).then(() => {
                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: 'Avatar removed',
                });
                this.$emit('remove');
            });
        },
        onAvatarUpload(file) {
            this.isRequestPending = true;
            this.$emit('progress', true);

            if (file) {
                const {
                    name,
                } = file;

                const formData = new FormData();
                formData.append('upload', file, name);

                this.$axios.$post(`${this.languageCode}/accounts/${this.userId}/avatar`, formData, {
                    withLanguage: false,
                }).then(() => {
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: 'Avatar uploaded',
                    });
                    this.removeError('upload');
                    this.isRequestPending = false;
                    this.$emit('progress', false);
                    this.$emit('upload', this.userId);
                }).catch((e) => {
                    this.isRequestPending = false;
                    this.onError({
                        errors: e.data.errors,
                    });
                    this.$emit('progress', false);
                });
            }
        },
    },
};
</script>
