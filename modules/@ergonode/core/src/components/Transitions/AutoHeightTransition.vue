/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <transition
        name="expand"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave">
        <slot />
    </transition>
</template>

<script>
/* eslint-disable */

export default {
    name: 'AutoHeightTransition',
    methods: {
        enter(element) {
            const {
                width,
            } = getComputedStyle(element);

            element.style.width = width;
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            element.style.height = 'auto';

            const {
                height,
            } = getComputedStyle(element);

            element.style.width = null;
            element.style.position = null;
            element.style.visibility = null;
            element.style.height = 0;

            getComputedStyle(element).height;

            requestAnimationFrame(() => {
                element.style.height = height;
            });
        },
        afterEnter(element) {
            element.style.height = 'auto';
        },
        leave(element) {
            const {
                height,
            } = getComputedStyle(element);

            element.style.height = height;

            getComputedStyle(element).height;

            requestAnimationFrame(() => {
                element.style.height = 0;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    * {
        will-change: height;
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
    }

    .expand-enter-active,
    .expand-leave-active {
        transition: height 0.3s ease-in-out;
        overflow: hidden;
    }

    .expand-enter,
    .expand-leave-to {
        height: 0;
    }
</style>
