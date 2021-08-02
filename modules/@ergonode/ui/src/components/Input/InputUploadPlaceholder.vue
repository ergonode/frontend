/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="input-upload-placeholder">
        <IconUploadCloudFile
            :fill-color="greenColor"
            view-box="0 0 48 32"
            width="48"
            height="32" />
        <span class="input-upload-placeholder__title">
            Drag here or click to browse
        </span>
    </div>
</template>

<script>
import {
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'InputUploadPlaceholder',
    computed: {
        greenColor() {
            return GREEN;
        },
    },
};
</script>

<style lang="scss" scoped>
    .input-upload-placeholder {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__title {
            margin-top: 16px;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
        }
    }
</style>
