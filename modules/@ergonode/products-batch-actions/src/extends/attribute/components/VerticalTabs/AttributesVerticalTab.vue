/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="attributes-vertical-tab">
        <AttributesSideBar />
    </div>
</template>

<script>
import AttributesSideBar from '@ProductsBatchActions/extends/attribute/components/SideBars/AttributesSideBar';

export default {
    name: 'AttributesVerticalTab',
    components: {
        AttributesSideBar,
    },
};
</script>

<style lang="scss" scoped>
    .attributes-vertical-tab {
        position: relative;
        height: 100%;
    }
</style>
