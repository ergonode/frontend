/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="input-upload-spinner">
        <IconRefresh
            :height="32"
            :width="48"
            view-box="0 0 48 32" />
        <span class="input-upload-spinner__title">
            Uploading the file...
        </span>
    </div>
</template>

<script>

export default {
    name: 'InputUploadSpinner',
};
</script>

<style lang="scss" scoped>
    .input-upload-spinner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 18px 20px;

        &__title {
            margin-top: 16px;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;
        }
    }
</style>
