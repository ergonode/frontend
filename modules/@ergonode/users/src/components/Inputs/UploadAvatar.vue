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
        :border="border"
        @remove="onRemoveFile"
        @upload="onAvatarUpload">
        <template #file>
            <Picture />
        </template>
    </UploadFile>
</template>

<script>
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
        border: {
            type: Boolean,
            default: false,
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
            this.$emit('remove');
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

                this.$axios.$put(`${this.languageCode}/accounts/${this.userId}/avatar`, formData).then((id) => {
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: 'Avatar uploaded',
                    });
                    this.removeValidationError('upload');
                    this.isRequestPending = false;
                    this.$emit('progress', false);
                    this.$emit('upload', id);
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
