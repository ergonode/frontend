/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="attributes-vertical-tab">
        <AttributesSideBar
            :filter="filter"
            :scope="scope" />
    </div>
</template>

<script>
import AttributesSideBar from '@ProductBatchActions/components/SideBars/AttributesSideBar';

export default {
    name: 'AttributesVerticalTab',
    components: {
        AttributesSideBar,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        filter: {
            type: [
                Object,
                String,
            ],
            default: () => ({}),
        },
    },
};
</script>

<style lang="scss" scoped>
    .attributes-vertical-tab {
        position: relative;
        height: 100%;
    }
</style>
