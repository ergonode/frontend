/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ul class="upload-file-list">
        <slot />
    </ul>
</template>

<script>
export default {
    name: 'UploadFileList',
};
</script>

<style lang="scss" scoped>
    .upload-file-list {
        display: grid;
        grid-row-gap: 24px;
        grid-auto-flow: row;
        flex: 1;
    }
</style>
