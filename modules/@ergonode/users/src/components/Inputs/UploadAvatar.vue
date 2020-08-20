/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadFile
        :value="Boolean(value)"
        accept-files="*"
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
import Picture from '@Core/components/Multimedia/Picture';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import UploadFile from '@Media/components/Inputs/UploadFile/UploadFile';
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
        ...mapActions('validations', [
            'onError',
            'removeValidationError',
        ]),
        onRemoveFile() {
            this.$axios.$delete(`${this.languageCode}/accounts/${this.userId}/avatar`).then(() => {
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

                this.$axios.$post(`${this.languageCode}/accounts/${this.userId}/avatar`, formData).then(() => {
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: 'Avatar uploaded',
                    });
                    this.removeValidationError('upload');
                    this.isRequestPending = false;
                    this.$emit('progress', false);
                    this.$emit('upload', this.userId);
                }).catch((e) => {
                    this.isRequestPending = false;
                    this.onError(e.data);
                    this.$emit('progress', false);
                });
            }
        },
    },
};
</script>
