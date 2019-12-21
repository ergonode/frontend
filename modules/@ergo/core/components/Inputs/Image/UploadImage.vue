/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['upload-image', { 'upload-image--required': required }]"
        :style="{ height }">
        <div class="upload-image__activator">
            <label
                class="upload-image__label"
                :for="associatedLabel"
                v-text="label" />
            <input
                type="file"
                accept="image/*"
                :disabled="disabled"
                @input="onUpload">
            <template v-if="!image">
                <div class="upload-image__placeholder">
                    <img
                        :src="require('~/assets/images/placeholders/upload_file.svg')"
                        alt="Place to drag or browse file">
                    <span class="upload-image__description">
                        Drag image here or browse
                    </span>
                </div>
            </template>
            <template v-else>
                <div class="upload-image__container">
                    <img
                        :src="image"
                        alt="Uploaded file">
                </div>
                <div class="upload-image__remove-btn">
                    <FabButton
                        :theme="secondaryTheme"
                        @select="onRemove">
                        <template #icon="{ color }">
                            <IconDelete :fill-color="color" />
                        </template>
                    </FabButton>
                </div>
            </template>
        </div>
        <span
            v-if="uploadError"
            class="upload-image__error-label"
            v-text="uploadError.join(', ')" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { THEMES } from '@Core/defaults/buttons';
import { GRAPHITE, GREEN } from '~/assets/scss/_variables/_colors.scss';
import { getImageData } from '~/model/multimedia';

export default {
    name: 'UploadImage',
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
            default: '150px',
        },
    },
    components: {
        FabButton: () => import('@Core/components/Buttons/FabButton'),
        IconDelete: () => import('~/components/Icon/Actions/IconDelete'),
    },
    data() {
        return {
            image: null,
            deleteIconFillColor: GRAPHITE,
            associatedLabel: '',
        };
    },
    mounted() {
        if (this.value) {
            this.getImageById(this.value);
        }

        this.associatedLabel = `input-${this._uid}`;
    },
    computed: {
        ...mapState('validations', {
            uploadError: (state) => state.validationErrors.upload,
        }),
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    methods: {
        ...mapActions('validations', [
            'onError',
            'removeValidationError',
        ]),
        onMouseEnter() {
            this.deleteIconFillColor = GREEN;
        },
        onMouseLeave() {
            this.deleteIconFillColor = GRAPHITE;
        },
        onRemove() {
            this.image = null;
            this.$emit('remove');
        },
        onUpload(event) {
            const [file] = event.target.files;

            if (file) {
                const { name } = file;

                const formData = new FormData();
                formData.append('upload', file, name);

                this.$axios.$post('multimedia/upload', formData).then(({ id }) => {
                    this.getImageById(id);
                    this.$emit('upload', id);

                    this.$addAlert({ type: 'success', message: 'File uploaded' });
                    this.removeValidationError('upload');
                }).catch((e) => this.onError(e.data));
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
    .upload-image {
        $upload: &;

        display: flex;
        flex-direction: column;

        &__activator {
            position: relative;
            display: flex;
            flex: 1;
            flex-direction: column;
            border: $BORDER_1_GREY;
            padding: 12px;
            box-sizing: border-box;
        }

        input {
            position: absolute;
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
            outline: none;
            opacity: 0;
        }

        &__label {
            position: absolute;
            top: -9px;
            left: 9px;
            padding: 0 2px;
            background-color: $WHITE;
            color: $GRAPHITE_LIGHT;
        }

        &__placeholder {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: $BORDER_DASHED_GREY;
        }

        &__description {
            margin-top: 16px;
            color: $GRAPHITE_DARK;
        }

        &__error-label {
            margin: 2px 0 0 12px;
            color: $RED;
        }

        &__description, &__label, &__error-label {
            font: $FONT_MEDIUM_12_16;
        }

        &__remove-btn {
            position: absolute;
            top: 24px;
            right: 24px;
            background-color: $WHITE;
            border-radius: 999px;
        }

        &__container {
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
            height: 0;
            overflow: hidden;

            img {
                width: 100%;
                max-width: 100%;
                height: 100%;
                object-fit: cover;
                transform: scale(1);
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

                &:hover {
                    transform: scale(1.1);
                }
            }
        }

        &--required {
            #{$upload}__label::after {
                position: absolute;
                color: $RED;
                content: "*";
            }
        }
    }
</style>
