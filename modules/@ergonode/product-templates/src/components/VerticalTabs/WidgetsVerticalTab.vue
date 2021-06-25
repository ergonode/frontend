/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="widgets-vertical-tab">
        <WidgetsSideBar
            :scope="scope"
            :disabled="disabled"
            :dragging-element-type="draggingElementType" />
    </div>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import WidgetsSideBar from '@Templates/components/SideBars/WidgetsSideBar';

export default {
    name: 'WidgetsVerticalTab',
    components: {
        WidgetsSideBar,
    },
    props: {
        scope: {
            type: String,
            default: '',
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
    .widgets-vertical-tab {
        height: 100%;
    }
</style>
