/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="form-subsection">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'FormSubsection',
};
</script>

<style lang="scss" scoped>
    .form-subsection {
        display: grid;
        grid-auto-flow: row;
        grid-row-gap: 8px;
    }
</style>
