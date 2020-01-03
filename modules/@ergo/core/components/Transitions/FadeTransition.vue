/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Transition
        name="fade"
        mode="out-in">
        <slot />
    </Transition>
</template>

<script>
export default {
    name: 'FadeTransition',
};
</script>

<style lang="scss" scoped>
    @import "@Core/assets/scss/fade/fade.scss";
</style>
