/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ul class="form-list-subsection">
        <slot />
    </ul>
</template>

<script>
export default {
    name: 'FormListSubsection',
};
</script>

<style lang="scss" scoped>
    .form-list-subsection {
        display: grid;
        grid-auto-flow: row;
        grid-row-gap: 16px;
    }
</style>
