/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
    name: 'AutoWidthTransition',
    methods: {
        enter(element) {
            const {
                height,
            } = getComputedStyle(element);

            element.style.height = height;
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            element.style.height = 'auto';

            const {
                width,
            } = getComputedStyle(element);

            element.style.height = null;
            element.style.position = null;
            element.style.visibility = null;
            element.style.width = 0;

            getComputedStyle(element).width;

            requestAnimationFrame(() => {
                element.style.width = width;
            });
        },
        afterEnter(element) {
            element.style.width = 'auto';
        },
        leave(element) {
            const {
                width,
            } = getComputedStyle(element);

            element.style.width = width;

            getComputedStyle(element).width;

            requestAnimationFrame(() => {
                element.style.width = 0;
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
        transition: width 0.3s ease-in-out;
        overflow: hidden;
    }

    .expand-enter,
    .expand-leave-to {
        width: 0;
    }
</style>
