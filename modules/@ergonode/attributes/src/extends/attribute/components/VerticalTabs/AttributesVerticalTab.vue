/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="attributes-vertical-tab">
        <AttributesSideBar
            :scope="scope"
            :disabled="disabled"
            :dragging-element-type="draggingElementType"
            :is-select-language="isSelectLanguage" />
        <CreateAttributeFab
            v-if="isAddingEnabled"
            :floating="{ bottom: '16px', right: '16px' }" />
    </div>
</template>

<script>
import CreateAttributeFab from '@Attributes/components/Buttons/CreateAttributeFab';
import AttributesSideBar from '@Attributes/extends/attribute/components/SideBars/AttributesSideBar';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';

export default {
    name: 'AttributesVerticalTab',
    components: {
        AttributesSideBar,
        CreateAttributeFab,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        isSelectLanguage: {
            type: Boolean,
            default: true,
        },
        isAddingEnabled: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Type of the place from where element is dragging
         */
        draggingElementType: {
            type: String,
            default: DRAGGED_ELEMENT.LIST,
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
