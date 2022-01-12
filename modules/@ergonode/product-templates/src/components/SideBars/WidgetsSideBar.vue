/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SideBar
        :title="$t('@Templates.productTemplate.components.WidgetsSideBar.title')"
        :items="widgets"
        option-key="type">
        <template #item="{ item }">
            <WidgetSideBarElement
                :scope="scope"
                :item="item"
                :dragging-element-type="draggingElementType"
                :disabled="disabled" />
        </template>
    </SideBar>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import WidgetSideBarElement from '@Templates/components/SideBars/WidgetSideBarElement';
import {
    mapState,
} from 'vuex';

export default {
    name: 'WidgetsSideBar',
    components: {
        WidgetSideBarElement,
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
    computed: {
        ...mapState('productTemplate', [
            'types',
        ]),
        widgets() {
            return this.types.filter(type => type.variant === 'ui');
        },
    },
};
</script>
