/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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

export default {
    name: 'TreeAccordionItemBadge',
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
