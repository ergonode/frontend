/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NumericBadge
        :number="badgeNumber"
        :theme="badgeTheme" />
</template>

<script>
import {
    THEME,
} from '@Core/defaults/theme';
import NumericBadge from '@UI/components/Badges/NumericBadge';

export default {
    name: 'TreeAccordionItemBadge',
    components: {
        NumericBadge,
    },
    props: {
        all: {
            type: Number,
            default: 0,
        },
        selected: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        badgeNumber() {
            return this.selected > 0 ? `${this.selected} / ${this.all}` : this.all;
        },
        badgeTheme() {
            return this.selected > 0 ? THEME.PRIMARY : THEME.SECONDARY;
        },
    },
};
</script>

<style lang="scss" scoped>
    .tree-accordion-item-badge {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 16px;
        height: 16px;
        padding: 0 6px 0 4px;
        box-sizing: border-box;
        background-color: $WHITESMOKE;
        color: $GRAPHITE;
        font: $FONT_SEMI_BOLD_10_12;
        border-radius: 999px;
    }
</style>
