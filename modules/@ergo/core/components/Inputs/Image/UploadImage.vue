/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['upload-image', { 'upload-image--required': required }]">
        <fieldset class="upload-image__activator">
            <legend
                class="upload-image__label"
                :for="associatedLabel"
                v-text="label"
                v-if="label" />
            <input
                type="file"
                accept="image/*"
                :disabled="disabled"
                @input="onUpload">
            <template v-if="!image">
                <div
                    class="upload-image__placeholder"
                    :style="{ height: height }">
                    <img
                        :src="require('@Core/assets/images/placeholders/upload_file.svg')"
                        alt="Place to drag or browse file">
                    <span class="upload-image__description">
                        Drag the file here or browse
                    </span>
                </div>
            </template>
            <template v-else>
                <img
                    class="upload-image__image"
                    :src="image"
                    alt="Uploaded file">
                <div class="upload-image__remove-button">
                    <Fab
                        :theme="secondaryTheme"
                        @click.native="onRemove">
                        <template #icon="{ color, isHovered }">
                            <IconDelete :fill-color="isHovered ? redColor : color" />
                        </template>
                    </Fab>
                </div>
            </template>
        </fieldset>
        <span
            v-if="uploadError"
            class="upload-image__error-label"
            v-text="uploadError.join(', ')" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { THEME } from '@Core/defaults/theme';
import { GRAPHITE, GREEN, RED } from '@Core/assets/scss/_js-variables/colors.scss';
import { getImageData } from '@Core/models/multimedia';
import { ALERT_TYPE } from '@Core/defaults/alerts';

export default {
    name: 'UploadImage',
    components: {
        Fab: () => import('@Core/components/Buttons/Fab'),
        IconDelete: () => import('@Core/components/Icons/Actions/IconDelete'),
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
            default: '150px',
        },
        border: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            image: null,
            deleteIconFillColor: GRAPHITE,
            associatedLabel: '',
        };
    },
    computed: {
        ...mapState('validations', {
            uploadError: state => state.validationErrors.upload,
        }),
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        redColor() {
            return RED;
        },
    },
    mounted() {
        if (this.value) {
            this.getImageById(this.value);
        }

        this.associatedLabel = `input-${this._uid}`;
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

                    this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'File uploaded' });
                    this.removeValidationError('upload');
                }).catch(e => this.onError(e.data));
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
            height: 100%;
            border: $BORDER_1_GREY;
            padding: 12px;
            box-sizing: border-box;
            overflow: hidden;
        }

        input {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
            outline: none;
            opacity: 0;
        }

        &__label {
            margin-bottom: -6px;
            background-color: $WHITE;
            color: $GRAPHITE_LIGHT;
        }

        &__placeholder {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: calc(100% - 18px);
            border: $BORDER_DASHED_GREY;
            box-sizing: border-box;
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

        &__remove-button {
            position: absolute;
            top: 24px;
            right: 24px;
            background-color: $WHITE;
            border-radius: 999px;
        }

        &__image {
            width: 100%;
            max-width: 100%;
            height: 100%;
            object-fit: cover;
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
