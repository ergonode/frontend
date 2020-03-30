/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['upload-file', { 'upload-file--required': required }]">
        <fieldset
            class="upload-file__activator"
            :style="{ height: height }">
            <legend
                class="upload-file__label"
                :for="associatedLabel"
                v-text="label"
                v-if="label" />
            <input
                v-if="!value"
                type="file"
                ref="input"
                :accept="acceptFiles"
                :disabled="disabled"
                @input="onUpload">
            <div
                v-if="requestPending"
                class="upload-file__loader">
                <IconRefresh />
                Uploading the file...
            </div>
            <div
                v-else
                class="upload-file__content">
                <div
                    class="upload-file__placeholder"
                    v-if="!value">
                    <img
                        :src="require('@Core/assets/images/placeholders/upload_file.svg')"
                        alt="Place to drag or browse file">
                    <span class="upload-file__description">
                        Drag the file here or browse
                    </span>
                </div>
                <template v-else>
                    <slot name="file" />
                    <Fab
                        :style="{ backgroundColor: whiteColor }"
                        :floating="{ top: '20px', right: '20px'}"
                        :theme="secondaryTheme"
                        @click.native="onRemove">
                        <template #icon="{ color, isHovered }">
                            <IconDelete :fill-color="isHovered ? redColor : color" />
                        </template>
                    </Fab>
                </template>
            </div>
        </fieldset>
        <span
            v-if="uploadError"
            class="upload-file__error-label"
            v-text="uploadError" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { THEME } from '@Core/defaults/theme';
import {
    GRAPHITE, GREEN, RED, WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'UploadFile',
    components: {
        Fab: () => import('@Core/components/Buttons/Fab'),
        IconDelete: () => import('@Core/components/Icons/Actions/IconDelete'),
        IconRefresh: () => import('@Core/components/Icons/Actions/IconRefresh'),
    },
    props: {
        label: {
            type: String,
            default: '',
        },
        acceptFiles: {
            type: String,
            required: true,
        },
        value: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        requestPending: {
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
        whiteColor() {
            return WHITE;
        },
    },
    mounted() {
        this.associatedLabel = `input-${this._uid}`;
    },
    methods: {
        onMouseEnter() {
            this.deleteIconFillColor = GREEN;
        },
        onMouseLeave() {
            this.deleteIconFillColor = GRAPHITE;
        },
        onRemove() {
            this.$emit('remove');
        },
        onUpload(event) {
            const [file] = event.target.files;

            this.$emit('upload', file);
        },
    },
};
</script>

<style lang="scss" scoped>
    .upload-file {
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

        &__loader {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;

            & > svg {
                margin-bottom: 16px;
            }
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

        &__content {
            height: calc(100% - 10px);
        }

        &__content, &__placeholder {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        &__placeholder {
            width: 100%;
            height: 100%;
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

        &--required {
            #{$upload}__label::after {
                position: absolute;
                color: $RED;
                content: "*";
            }
        }
    }
</style>
