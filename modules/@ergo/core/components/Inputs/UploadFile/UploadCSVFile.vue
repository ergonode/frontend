/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadFile
        :value="Boolean(image)"
        accept-files="csv/*"
        :request-pending="isRequestPending"
        :label="label"
        :required="required"
        :disabled="disabled"
        :height="height"
        :border="border"
        @remove="onRemoveFile"
        @upload="onFileUpload">
        <template #file />
    </UploadFile>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { ALERT_TYPE } from '@Core/defaults/alerts';
import UploadFile from '@Core/components/Inputs/UploadFile/UploadFile';

export default {
    name: 'UploadCSVFile',
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
        sourceType: {
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
    computed: {
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
    },
    methods: {
        ...mapActions('validations', [
            'onError',
            'removeValidationError',
        ]),
        onRemoveFile() {
            this.$emit('remove');
        },
        onFileUpload(file) {
            this.isRequestPending = true;

            if (file) {
                const { name } = file;

                const formData = new FormData();
                formData.append('upload', file, name);
                formData.append('source_type', this.sourceType);

                this.$axios.$post(`${this.languageCode}imports/upload`, formData).then((response) => {
                    console.log(response);
                    this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'File uploaded' });
                    this.removeValidationError('upload');
                    this.isRequestPending = false;
                }).catch((e) => {
                    this.isRequestPending = false;
                    this.onError(e.data);
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
