/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['responsive-view-template', {'responsive-view-template--fixed': fixed}]">
        <div
            v-if="isHeaderSlotVisible"
            class="responsive-view-template__header">
            <slot name="header" />
        </div>
        <div class="responsive-view-template__responsive-container">
            <slot name="content" />
        </div>
        <div class="responsive-view-template__footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ResponsiveCenteredViewTemplate',
    props: {
        fixed: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        isHeaderSlotVisible() {
            return !!this.$slots.header;
        },
    },
};
</script>

<style lang="scss" scoped>
    .responsive-view-template {
        $parent: &;

        display: grid;
        flex: 1;
        grid-template-columns: auto minmax(auto, 1008px) auto;
        grid-template-rows: max-content auto max-content;
        background-color: $WHITE;

        &--fixed {
            grid-template-columns: auto;

            #{$parent}__responsive-container {
                grid-area: 2 / 1 / 3 / 4;
            }
        }

        &:not(&--fixed) {
            &::before {
                content: "";
                grid-area: 1 / 1 / 2 / 2;
            }

            &::after {
                content: "";
                grid-area: 1 / 3 / 2 / 4;
            }

            #{$parent}__responsive-container {
                grid-area: 2 / 2 / 3 / 3;
                padding: 24px 24px 0;
            }
        }

        &__header {
            grid-area: 1 / 1 / 2 / 4;
            border-bottom: 1px solid $GREY;
            border-bottom: $BORDER_1_GREY;
        }

        &__responsive-container {
            display: flex;
            flex: 1 1 auto;
            flex-direction: column;
            min-width: 0;
        }

        &__footer {
            grid-area: 3 / 1 / 4 / 4;
            z-index: 3;
            box-shadow: $ELEVATOR_6_DP;
            min-height: 40px;
        }

        &__header, &__footer {
            display: flex;
            align-items: center;
            padding: 12px 24px;
            box-sizing: border-box;
            background-color: $WHITE;
        }
    }
</style>
