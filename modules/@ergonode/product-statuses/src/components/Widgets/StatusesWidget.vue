/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Widget title="Statuses">
        <template #body>
            <ul class="list-status">
                <template v-for="(status, index) in statuses">
                    <li
                        class="list-status-element"
                        :key="status.id">
                        <ProductStatusBadge :status="status" />
                        <span v-text="status.value" />
                    </li>
                    <div
                        class="list-status-element-divider"
                        :key="`${status.id}|${index}`" />
                </template>
            </ul>
        </template>
    </Widget>
</template>

<script>
import Widget from '@Core/components/Widget/Widget';
import {
    COLORS,
} from '@Core/defaults/colors';
import ProductStatusBadge from '@Products/components/Badges/ProductStatusBadge';

export default {
    name: 'StatusesWidget',
    components: {
        Widget,
        ProductStatusBadge,
    },
    props: {
        statusesCount: {
            type: Array,
            required: true,
        },
    },
    computed: {
        statuses() {
            return this.statusesCount.map((status) => {
                const color = COLORS[Math.floor(Math.random() * COLORS.length)];

                return {
                    id: status.status_id,
                    color,
                    label: status.label,
                    value: `${status.value} products`,
                };
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .list-status {
        display: grid;
        grid-row-gap: 16px;
    }

    .list-status-element {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: $WHITE;
        font: $FONT_MEDIUM_14_20;
    }

    .list-status-element-divider {
        height: 1px;
        background-color: $GRAPHITE;
    }
</style>
