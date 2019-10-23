/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['upload-image', {
            'upload-image--disabled': disabled,
            'upload-image--elevator': elevator,
        }]">
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
            class="upload-image__container"
            :style="imageHeightStyle">
            <div class="upload-image__remove-btn">
                <IconFabButton
                    theme="secondary"
                    icon-path="Actions/IconDelete"
                    @select="onRemove" />
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
        fixedHeight: {
            type: Boolean,
            default: true,
        },
        elevator: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        Picture: () => import('~/components/Inputs/Image/Picture'),
        IconFabButton: () => import('~/components/Buttons/IconFabButton'),
    },
    data() {
        return {
            selectedFileID: this.value,
            localImage: null,
            deleteIconFillColor: '#5c5f65',
        };
    },
    computed: {
        ...mapState('validations', {
            uploadError: (state) => state.validationErrors.upload,
        }),
        imageHeightStyle() {
            return this.fixedHeight ? { height: '150px' } : null;
        },
    },
    methods: {
        ...mapActions('validations', [
            'onError',
            'removeValidationError',
        ]),
        onMouseEnter() {
            this.deleteIconFillColor = '#00bc87';
        },
        onMouseLeave() {
            this.deleteIconFillColor = '#5c5f65';
        },
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
            }).catch((e) => this.onError(e.data));
        },
    },
};
</script>

<style lang="scss" scoped>
    .upload-image {
        $parent: &;

        position: relative;
        display: flex;
        flex-direction: column;

        &--elevator {
            #{$parent}__wrapper, #{$parent}__container {
                box-shadow:
                    0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 3px 1px -2px rgba(0, 0, 0, 0.12),
                    0 1px 5px 0 rgba(0, 0, 0, 0.2);
            }
        }

        &--disabled::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: $WHITESMOKE;
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
            padding: 43px 0;
            background-color: $WHITE;

            &::before {
                position: absolute;
                width: calc(100% - 32px);
                height: calc(100% - 32px);
                border: 1px dashed $GREY;
                content: "";
            }
        }

        &__container {
            position: relative;
            display: flex;
            max-height: 100%;
            background-color: $WHITE;
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

        &__remove-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $WHITE;
            border-radius: 50%;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }

        &__description {
            margin-top: 16px;
            text-align: center;
        }

        &__title {
            margin-bottom: 8px;
        }

        &__description, &__title {
            @include setFont(medium, small, regular, $GRAPHITE);
        }

        &__error-label {
            @include setFont(regular, tiny, tiny, $RED);

            margin-top: 8px;
        }
    }
</style>
