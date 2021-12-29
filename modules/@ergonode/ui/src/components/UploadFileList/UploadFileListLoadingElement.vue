/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li class="upload-file-list-loading-element">
        <div class="upload-file-list-loading-element__uploader">
            <template v-if="isUploading">
                <IconSpinner
                    :color="graphiteColor"
                    width="16"
                    height="16" />
                <span class="info-label">Uploading</span>
            </template>
            <template v-else>
                <IconCheck :fill-color="greenColor" />
                <span class="info-label">Finished</span>
                <span
                    class="info-error-label"
                    v-if="errorsNumber"
                    v-text="errorMessage" />
            </template>
        </div>
        <span
            :class="errorsNumber ? 'info-error-label' : 'info-label'"
            v-text="numberOfUploadedElements" />
    </li>
</template>

<script>
import {
    GRAPHITE,
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'UploadFileListLoadingElement',
    props: {
        files: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        graphiteColor() {
            return GRAPHITE;
        },
        greenColor() {
            return GREEN;
        },
        numberOfUploadedElements() {
            return `${this.files.filter(file => file.progressValue === 100 && !file.error).length}/${this.files.length}`;
        },
        isUploading() {
            return this.files.some(file => file.progressValue < 100);
        },
        errorsNumber() {
            return this.files.filter(file => file.error).length;
        },
        errorMessage() {
            if (this.errorsNumber === 1) {
                return '(1 error)';
            }

            return `(${this.errorsNumber} errors)`;
        },
    },
};
</script>

<style lang="scss" scoped>
    .upload-file-list-loading-element {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: $GRAPHITE;
        font: $FONT_SEMI_BOLD_16_24;

        &__uploader {
            display: flex;
            align-items: center;
        }

        .info-label, .info-error-label {
            margin-left: 4px;
        }

        .info-error-label {
            color: $RED;
        }
    }
</style>
