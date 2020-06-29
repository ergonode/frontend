/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadFile
        :value="Boolean(image)"
        accept-files="image/*"
        :request-pending="isRequestPending"
        :label="label"
        :required="required"
        :disabled="disabled"
        :height="height"
        :border="border"
        @remove="onRemoveFile"
        @upload="onFileUpload">
        <template #file>
            <img
                class="image-file"
                :src="image"
                alt="Uploaded file">
        </template>
    </UploadFile>
</template>

<script>
import UploadFile from '@Core/components/Inputs/UploadFile/UploadFile';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getImageData,
} from '@Core/models/multimedia';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UploadImageFile',
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
            image: null,
        };
    },
    watch: {
        value: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.getImageById(value);
                } else {
                    this.image = null;
                }
            },
        },
    },
    methods: {
        ...mapActions('validations', [
            'onError',
            'removeValidationError',
        ]),
        onRemoveFile() {
            this.image = null;
            this.$emit('remove', '');
        },
        onFileUpload(file) {
            this.isRequestPending = true;

            if (file) {
                const {
                    name,
                } = file;

                const formData = new FormData();
                formData.append('upload', file, name);

                this.$axios.$post('multimedia/upload', formData).then(({
                    id,
                }) => {
                    this.getImageById(id);
                    this.$emit('upload', id);

                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: 'File uploaded',
                    });
                    this.removeValidationError('upload');
                    this.isRequestPending = false;
                }).catch((e) => {
                    this.isRequestPending = false;
                    this.onError(e.data);
                });
            }
        },
        getImageById(id) {
            this.$axios.$get(`multimedia/${id}`, {
                responseType: 'arraybuffer',
            }).then((response) => {
                this.image = getImageData(response);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .image-file {
        width: 100%;
        max-width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
