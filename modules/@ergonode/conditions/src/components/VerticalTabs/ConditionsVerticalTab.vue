/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="conditions-vertical-tab">
        <ConditionsSideBar
            :scope="scope"
            :disabled="disabled"
            :dragging-element-type="draggingElementType"
            :group="group" />
    </div>
</template>

<script>
import ConditionsSideBar from '@Conditions/components/SideBars/ConditionsSideBar';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';

export default {
    name: 'ConditionsVerticalTab',
    components: {
        ConditionsSideBar,
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
        group: {
            type: String,
            required: true,
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
    .conditions-vertical-tab {
        height: 100%;
    }
</style>
