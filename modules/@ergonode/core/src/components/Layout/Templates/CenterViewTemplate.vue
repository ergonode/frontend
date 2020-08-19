/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['center-view-template', {'center-view-template--fixed': fixed}]">
        <div
            v-if="isHeaderSlotVisible"
            class="center-view-template__header">
            <slot name="header" />
        </div>
        <div class="center-view-template__body">
            <slot name="content">
                <VerticalFixedScroll>
                    <div class="container">
                        <VerticalCenteredView>
                            <slot name="centeredContent" />
                        </VerticalCenteredView>
                    </div>
                </VerticalFixedScroll>
            </slot>
        </div>
    </div>
</template>

<script>
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';
import VerticalCenteredView from '@Core/components/Layout/VerticalCenteredView';

export default {
    name: 'CenterViewTemplate',
    components: {
        VerticalFixedScroll,
        VerticalCenteredView,
    },
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
    .center-view-template {
        $parent: &;

        display: grid;
        flex: 1;
        grid-template-columns: auto minmax(auto, 1008px) auto;
        grid-template-rows: max-content auto;
        box-sizing: border-box;
        background-color: $WHITE;

        &--fixed {
            #{$parent}__body {
                grid-area: 2 / 1 / 3 / 4;
            }
        }

        &:not(&--fixed) {
            #{$parent}__body {
                grid-area: 2 / 2 / 3 / 3;
                padding: 24px;
            }
        }

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            grid-area: 1 / 1 / 2 / 4;
            height: 64px;
            padding: 12px 24px;
            border-bottom: $BORDER_1_GREY;
            box-sizing: border-box;
            background-color: $WHITE;
        }

        &__body {
            display: flex;
            flex-direction: column;
            min-width: 0;
        }
    }

    .container {
        display: flex;
    }
</style>
