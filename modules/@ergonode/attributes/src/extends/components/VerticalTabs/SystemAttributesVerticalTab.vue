/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="system-attributes-vertical-tab">
        <SystemAttributesSideBar />
    </div>
</template>

<script>
import SystemAttributesSideBar from '@Attributes/extends/components/SideBars/SystemAttributesSideBar';

export default {
    name: 'SystemAttributesVerticalTab',
    components: {
        SystemAttributesSideBar,
    },
};
</script>

<style lang="scss" scoped>
    .system-attributes-vertical-tab {
        height: 100%;
    }
</style>
