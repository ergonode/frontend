/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="attributes-vertical-tab">
        <AttributesSideBar
            :disabled="disabled"
            :is-select-language="isSelectLanguage" />
        <CreateAttributeFab :floating="{ bottom: '16px', right: '16px' }" />
    </div>
</template>

<script>
import CreateAttributeFab from '@Attributes/components/Buttons/CreateAttributeFab';
import AttributesSideBar from '@Attributes/extends/attribute/components/SideBars/AttributesSideBar';

export default {
    name: 'AttributesVerticalTab',
    components: {
        AttributesSideBar,
        CreateAttributeFab,
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
    .attributes-vertical-tab {
        position: relative;
        height: 100%;
    }
</style>
