/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'CarouselItem',
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'carousel-item',
                {
                    'carousel-item--visible': this.visible,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .carousel-item {
        display: none;
        flex: 1 1 auto;
        justify-content: center;
        height: 0;

        &--visible {
            display: flex;
        }
    }
</style>
