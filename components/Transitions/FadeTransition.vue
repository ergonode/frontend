/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Transition name="fade">
        <slot />
    </Transition>
</template>

<script>
export default {
    name: 'FadeTransition',
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/fade.scss";
</style>
