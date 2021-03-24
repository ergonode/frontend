/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="system-attributes-vertical-tab">
        <SystemAttributesSideBar
            :disabled="disabled"
            :is-select-language="isSelectLanguage" />
    </div>
</template>

<script>
import SystemAttributesSideBar from '@Attributes/extends/attribute/components/SideBars/SystemAttributesSideBar';

export default {
    name: 'SystemAttributesVerticalTab',
    components: {
        SystemAttributesSideBar,
    },
    props: {
        isSelectLanguage: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .system-attributes-vertical-tab {
        height: 100%;
    }
</style>
