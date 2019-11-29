/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TransitionGroup
        name="fade"
        mode="out-in">
        <slot />
    </TransitionGroup>
</template>

<script>
export default {
    name: 'FadeGroupTransition',
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/fade.scss";
</style>
