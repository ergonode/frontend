/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="attributes-vertical-tab">
        <AttributesSideBar
            :ids="ids"
            :excluded-ids="excludedIds" />
    </div>
</template>

<script>
import AttributesSideBar from '@ProductsBatchActions/extends/attribute/components/SideBars/AttributesSideBar';

export default {
    name: 'AttributesVerticalTab',
    components: {
        AttributesSideBar,
    },
    props: {
        ids: {
            type: Array,
            default: () => [],
        },
        excludedIds: {
            type: Array,
            default: () => [],
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
