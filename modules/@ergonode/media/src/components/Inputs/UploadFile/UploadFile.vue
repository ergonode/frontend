/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes">
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
                <IconRefresh
                    :height="32"
                    :width="48"
                    view-box="0 0 48 32" />
                Uploading the file...
            </div>
            <div
                v-else
                class="upload-file__content">
                <div
                    class="upload-file__placeholder"
                    v-if="!value">
                    <IconUploadCloudFile
                        :fill-color="greenColor"
                        view-box="0 0 48 32"
                        width="48"
                        height="32" />
                    <span class="upload-file__description">
                        Drag the file here or browse
                    </span>
                </div>
                <template v-else>
                    <slot name="file" />
                    <Fab
                        v-if="!disabled"
                        :style="{ backgroundColor: whiteColor }"
                        :floating="{ top: '20px', right: '20px'}"
                        :theme="destructiveTheme"
                        @click.native="onRemove">
                        <template #icon="{ color }">
                            <IconDelete :fill-color="color" />
                        </template>
                    </Fab>
                </template>
            </div>
        </fieldset>
        <span
            v-if="errorMessages"
            class="upload-file__error-label"
            v-text="errorMessages" />
    </div>
</template>

<script>
import {
    THEME,
} from '@Core/defaults/theme';
import {
    GRAPHITE,
    GREEN,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Fab from '@UI/components/Fab/Fab';
import IconDelete from '@UI/components/Icons/Actions/IconDelete';
import IconRefresh from '@UI/components/Icons/Actions/IconRefresh';
import IconUploadCloudFile from '@UI/components/Icons/Actions/IconUploadCloudFile';
import associatedLabelMixin from '@UI/mixins/inputs/associatedLabelMixin';

export default {
    name: 'UploadFile',
    components: {
        Fab,
        IconDelete,
        IconRefresh,
        IconUploadCloudFile,
    },
    mixins: [
        associatedLabelMixin,
    ],
    props: {
        label: {
            type: String,
            default: '',
        },
        errorMessages: {
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
        /**
         * Determines if the given field is required
         */
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
        };
    },
    computed: {
        classes() {
            return [
                'upload-file',
                {
                    'upload-file--required': this.required,
                    'upload-file--floating-label': Boolean(this.label),
                    'upload-file--disabled': this.disabled,
                    'upload-file--error': this.errorMessages !== '',
                },
            ];
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        destructiveTheme() {
            return THEME.DESTRUCTIVE;
        },
        greenColor() {
            return GREEN;
        },
        whiteColor() {
            return WHITE;
        },
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
            const [
                file,
            ] = event.target.files;

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
            padding: 18px 20px;
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
            z-index: $Z_INDEX_LVL_1;
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

        &__content:not(&--floating-label) {
            height: 100%;
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

        &--disabled {
            #{$upload}__content, input {
                background-color: $WHITESMOKE;
                color: $GRAPHITE_LIGHT;
            }
        }

        &--required {
            #{$upload}__label::after {
                position: absolute;
                color: $RED;
                content: "*";
            }
        }

        &--error {
            #{$upload}__activator {
                border-color: $RED;
            }

            #{$upload}__label {
                color: $RED;
            }
        }
    }
</style>
