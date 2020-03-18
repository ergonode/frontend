/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TransitionGroup
        mode="out-in"
        name="slide">
        <slot />
    </TransitionGroup>
</template>

<script>
export default {
    name: 'SlideInTransition',
};
</script>

<style lang="scss" scoped>
    .slide-enter-active {
        animation: slide-in 0.5s;
    }

    .slide-leave-active {
        animation: slide-in 0.5s reverse;
    }
    @keyframes slide-in {
        from {
            visibility: visible;
            transform: translateX(100%);
        }

        to {
            transform: translateX(0);
        }
    }
</style>
