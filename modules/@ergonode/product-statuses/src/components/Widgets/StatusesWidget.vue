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
                        <span v-text="productsInStatus" />
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
import ProductStatusBadge from '@Products/components/Badges/ProductStatusBadge';
import {
    mapState,
} from 'vuex';

export default {
    name: 'StatusesWidget',
    components: {
        Widget,
        ProductStatusBadge,
    },
    data() {
        return {
            statuses: [],
        };
    },
    computed: {
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        productsInStatus() {
            return '0 products';
        },
    },
    created() {
        const params = {
            limit: 99999,
            offset: 0,
            field: 'code',
            order: 'ASC',
        };

        this.$axios
            .get(`${this.languageCode}/status`, {
                params,
            })
            .then(({
                data: {
                    columns,
                    collection,
                },
            }) => {
                const colorColumn = columns.find(({
                    id,
                }) => id === 'status');

                this.statuses = collection.map(({
                    id,
                    code,
                    name,
                }) => ({
                    id,
                    name,
                    code,
                    color: colorColumn.colors[code],
                }));
            });
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
