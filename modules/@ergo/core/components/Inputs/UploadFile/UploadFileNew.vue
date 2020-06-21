/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="[
            'upload-file',
            {
                'upload-file--required': required,
                'upload-file--floating-label': Boolean(label),
                'upload-file--disabled': disabled,
                'upload-file--fixed-height': fixedHeight,
                'small': small,
            },
        ]">
        <fieldset>
            <legend>
                <label
                    :for="associatedLabel"
                    class="upload-file__label"
                    v-text="label" />
            </legend>
        </fieldset>
        <div class="upload-file__activator">
            <slot name="activator" />
        </div>
    </div>
</template>

<script>
import {
    GRAPHITE,
    GREEN,
    RED,
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import associatedLabelMixin from '@Core/mixins/inputs/associatedLabelMixin';

export default {
    name: 'UploadFile',
    mixins: [
        associatedLabelMixin,
    ],
    props: {
        label: {
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
        small: {
            type: Boolean,
            default: false,
        },
        fixedHeight: {
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
        redColor() {
            return RED;
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
        onShowModal() {
            this.isModalVisible = true;
        },
        onCloseModal() {
            this.isModalVisible = false;
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

        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        fieldset {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            border: $BORDER_1_GREY;
            padding: 11px;
            box-sizing: border-box;

            legend {
                background-color: $WHITE;
                color: $GRAPHITE_LIGHT;
                font: $FONT_MEDIUM_12_16;
            }
        }

        &__activator {
            width: 100%;
            height: 100%;
            padding: 12px;
            box-sizing: border-box;
            overflow: auto;
        }

        &.small {
            #{$upload}__activator {
                padding: 8px;
            }

            fieldset {
                padding: 8px;
            }
        }

        &--fixed-height {
            .small {
                height: 112px;
            }
        }

        &--fixed-height:not(.small) {
            height: 190px;
        }

        &--disabled {
            background-color: $WHITESMOKE;
        }

        &--required {
            #{$upload}__label::after {
                position: absolute;
                color: $RED;
                content: "*";
            }
        }

        &--floating-label {
            #{$upload}__activator {
                margin-top: 8px;
            }
        }

        &--floating-label &.small {
            #{$upload}__activator {
                margin-top: 4px;
            }
        }
    }
</style>
