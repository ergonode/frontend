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
            <IconFile :fill-color="greenColor" />
            <LinkButton :title="file.name" />
        </template>
    </UploadFile>
</template>

<script>
import {
    GREEN,
} from '@Core/assets/scss/_js-variables/colors.scss';
import LinkButton from '@Core/components/Buttons/LinkButton';
import IconFile from '@Core/components/Icons/Others/IconFile';
import UploadFile from '@Core/components/Inputs/UploadFile/UploadFile';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    mapActions,
    mapState,
} from 'vuex';

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
        sourceId: {
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
        greenColor() {
            return GREEN;
        },
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
                const {
                    name,
                } = file;

                const formData = new FormData();
                formData.append('upload', file, name);

                this.$axios.$post(`${this.languageCode}/sources/${this.sourceId}/upload`, formData).then(() => {
                    this.file = file;
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: 'File uploaded',
                    });
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
    .link-button {
        margin-top: 16px;
    }
</style>
