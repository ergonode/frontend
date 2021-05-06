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
    name: 'DesignerBackgroundItem',
    props: {
        hasRightBorder: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'designer-background-item',
                {
                    'designer-background-item--right-border': this.hasRightBorder,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .designer-background-item {
        border-top: $BORDER_DASHED_GREY;
        border-left: $BORDER_DASHED_GREY;

        &--right-border {
            border-right: $BORDER_DASHED_GREY;
        }
    }
</style>
