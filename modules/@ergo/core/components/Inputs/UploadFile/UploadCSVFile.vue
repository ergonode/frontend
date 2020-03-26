/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadFile
        :value="Boolean(file)"
        accept-files="csv/*"
        :request-pending="isRequestPending"
        :label="label"
        :required="required"
        :disabled="disabled"
        :height="height"
        :border="border"
        @remove="onRemoveFile"
        @upload="onFileUpload">
        <template #file>
            <div class="csv-file">
                <IconFile />
                <LinkButton :title="file.name" />
            </div>
        </template>
    </UploadFile>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { ALERT_TYPE } from '@Core/defaults/alerts';
import UploadFile from '@Core/components/Inputs/UploadFile/UploadFile';
import IconFile from '@Core/components/Icons/Others/IconFile';
import LinkButton from '@Core/components/Buttons/LinkButton';

export default {
    name: 'UploadCSVFile',
    components: {
        UploadFile,
        IconFile,
        LinkButton,
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
            file: null,
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
            this.$emit('progress', true);

            if (file) {
                const { name } = file;

                const formData = new FormData();
                formData.append('upload', file, name);
                formData.append('source_id', this.sourceType);

                this.$axios.$post(`${this.languageCode}/imports/upload`, formData).then((response) => {
                    console.log(response);
                    this.file = file;
                    this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'File uploaded' });
                    this.removeValidationError('upload');
                    this.isRequestPending = false;
                    this.$emit('progress', false);
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

<style lang="scss" scoped>
    .csv-file {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & > .link-button {
            margin-top: 16px;
        }
    }
</style>
