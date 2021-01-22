/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tree-accordion-item-badge">
        <IconMark
            :fill-color="greenColor"
            width="16"
            heigt="16"
            view-box="0 0 24 24" />
        {{ number }}
    </div>
</template>

<script>
import {
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';
import IconMark from '@UI/components/Icons/Feedback/IconMark';

export default {
    name: 'TreeAccordionItemBadge',
    components: {
        IconMark,
    },
    props: {
        number: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        greenColor() {
            return GREEN;
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
