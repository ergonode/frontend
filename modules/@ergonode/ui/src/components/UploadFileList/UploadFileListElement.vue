/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li :class="classes">
        <div class="horizontal-wrapper">
            <div class="vertical-wrapper">
                <span
                    class="upload-file-list-element__file-name"
                    v-text="file.name" />
                <span
                    class="upload-file-list-element__file-size"
                    v-text="fileProgress" />
            </div>
            <IconButton
                v-if="isError"
                :size="smallSize"
                :theme="secondaryPlainTheme">
                <template #icon>
                    <IconError :fill-color="redColor" />
                </template>
            </IconButton>
            <template v-else>
                <IconButton
                    v-show="isUploading"
                    :size="smallSize"
                    :theme="secondaryPlainTheme"
                    @click.native="onCancelUploading">
                    <template #icon>
                        <IconFilledClose />
                    </template>
                </IconButton>
                <IconButton
                    v-show="!isUploading"
                    :size="smallSize"
                    :theme="secondaryPlainTheme">
                    <template #icon>
                        <IconCheck :fill-color="greenColor" />
                    </template>
                </IconButton>
            </template>
        </div>
        <ProgressBar
            :color="progressColor"
            :value="file.progressValue" />
    </li>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    GREEN,
    RED,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'UploadFileListElement',
    props: {
        file: {
            type: Object,
            required: true,
        },
    },
    computed: {
        classes() {
            return [
                'upload-file-list-element',
                {
                    'upload-file-list-element--error': this.isError,
                },
            ];
        },
        greenColor() {
            return GREEN;
        },
        redColor() {
            return RED;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        progressColor() {
            return this.isError ? RED : GREEN;
        },
        secondaryPlainTheme() {
            return THEME.SECONDARY_PLAIN;
        },
        fileProgress() {
            if (this.isError) {
                return this.file.error;
            }

            return `${this.file.progressInfo} / ${this.file.size}`;
        },
        isUploading() {
            return +this.file.progressValue < 100;
        },
        isError() {
            return this.file.error.length > 1;
        },
    },
    methods: {
        onCancelUploading() {
            this.file.cancelToken.cancel(`Uploading ${this.file.name} has been canceled`);
        },
    },
};
</script>

<style lang="scss" scoped>
    .upload-file-list-element {
        $element: &;

        display: flex;
        flex-direction: column;
        overflow: hidden;

        &__file-name {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        &__file-size {
            margin-top: 2px;
            font: $FONT_SEMI_BOLD_10_12;
        }

        &__file-size:not(&--error) {
            color: $GREY_DARK;
        }

        &--error {
            #{$element}__file-size {
                color: $RED;
            }
        }
    }

    .horizontal-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }

    .vertical-wrapper {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 0;
    }
</style>
