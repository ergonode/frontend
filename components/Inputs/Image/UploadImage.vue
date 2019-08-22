/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['upload-image', {'upload-image--disabled': disabled}]">
        <span
            v-if="title"
            class="upload-image__title"
            v-text="title" />
        <div
            v-if="!selectedFileID"
            class="upload-image__wrapper">
            <input
                class="upload-image__activator"
                type="file"
                accept="image/*"
                :value="selectedFileID"
                @input="e => onUpload(e)">
            <img
                :src="require('~/assets/images/icons/upload.svg')"
                alt="placeholder">
            <span class="upload-image__description txt-fixed">Drag image here or browse</span>
        </div>
        <div
            v-else
            class="upload-image__container">
            <div class="btn-wrapper">
                <Button
                    fab
                    color="transparent"
                    @click.native="onRemove">
                    <template v-slot:prepend>
                        <IconDelete />
                    </template>
                </Button>
            </div>
            <Picture :image-id="selectedFileID" />
        </div>
        <span
            v-if="uploadError"
            class="upload-image__error-label"
            v-text="uploadError.join(', ')" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'UploadImage',
    props: {
        title: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        Button: () => import('~/components/Buttons/Button'),
        IconDelete: () => import('~/components/Icon/Actions/IconDelete'),
        Picture: () => import('~/components/Inputs/Image/Picture'),
    },
    data() {
        return {
            selectedFileID: this.value,
            localImage: null,
        };
    },
    computed: {
        ...mapState('validations', {
            uploadError: state => state.validationErrors.upload,
        }),
    },
    methods: {
        ...mapActions('validations', [
            'onError',
            'removeValidationError',
        ]),
        onRemove() {
            this.selectedFileID = '';
            this.localImage = null;
            this.$emit('remove');
        },
        onUpload(event) {
            const [file] = event.target.files;
            const { name } = file;

            const formData = new FormData();
            formData.append('upload', file, name);

            this.$axios.$post('multimedia/upload', formData).then(({ id }) => {
                this.selectedFileID = id;
                this.$emit('upload', id);

                this.$addAlert({ type: 'success', message: 'File uploaded' });
                this.removeValidationError('upload');
            }).catch(e => this.onError(e.data));
        },
    },
};
</script>

<style lang="scss" scoped>
    .upload-image {
        position: relative;
        display: grid;
        grid-template-rows: max-content 150px max-content;
        row-gap: 8px;

        &--disabled::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: $background;
            opacity: 0.5;
            content: "";
            cursor: not-allowed;
        }

        &__wrapper {
            position: relative;
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 24px;
            background-color: $white;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);

            &::before {
                position: absolute;
                width: calc(100% - 32px);
                height: calc(100% - 32px);
                border: 1px dashed $grey;
                content: "";
            }
        }

        &__container {
            position: relative;
            display: flex;
            flex: 1;
            background-color: $white;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);

            .btn-wrapper {
                position: absolute;
                top: 16px;
                right: 16px;
                background-color: $white;
                border-radius: 999px;
            }
        }

        &__activator {
            position: absolute;
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
            outline: none;
            opacity: 0;
        }

        &__description {
            margin-top: 16px;
            text-align: center;
        }

        &__description, &__title {
            @include setFont(medium, small, regular, $graphite);
        }

        &__error-label {
            color: $error;
            font: 500 10px/12px "Inter UI";
        }
    }
</style>
