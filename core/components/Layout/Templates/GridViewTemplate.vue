/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-view-template">
        <div class="grid-view-template__sidebar">
            <slot name="sidebar" />
        </div>
        <div class="grid-view-template__grid">
            <slot name="grid" />
        </div>
        <div
            v-if="isFooterSlotVisible"
            class="grid-view-template__footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'GridViewTemplate',
    computed: {
        isFooterSlotVisible() {
            return !!this.$slots.footer;
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-view-template {
        display: grid;
        flex: 1;
        grid-template-rows: max-content auto max-content;
        grid-template-columns: max-content 1fr;
        box-sizing: border-box;
        background-color: $WHITE;
        border-top: $BORDER_1_GREY;

        &__sidebar {
            grid-area: 1 / 1 / 3 / 2;
            height: 100%;
        }

        &__grid {
            display: flex;
            flex-direction: column;
            grid-area: 1 / 2 / 3 / 3;
            min-width: 0;
        }

        &__footer {
            grid-area: 3 / 1 / 3 / 3;
            z-index: $Z_INDEX_LVL_5;
            display: flex;
            align-items: center;
            padding: 12px 24px;
            box-sizing: border-box;
            min-height: 40px;
            background-color: $WHITE;
            box-shadow: $ELEVATOR_6_DP;
        }
    }
</style>
