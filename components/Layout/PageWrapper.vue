/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="page-wrapper">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'PageWrapper',
};
</script>

<style lang="scss" scoped>
    .page-wrapper {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: $WHITESMOKE;
    }
</style>
