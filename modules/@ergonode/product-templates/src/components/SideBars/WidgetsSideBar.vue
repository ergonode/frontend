/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SideBar
        :title="$t('@Templates.productTemplate.components.WidgetsSideBar.title')"
        :items="widgets">
        <template #item="{ item }">
            <WidgetSideBarElement
                :item="item"
                :disabled="disabled" />
        </template>
    </SideBar>
</template>

<script>
import WidgetSideBarElement from '@Templates/components/SideBars/WidgetSideBarElement';
import SideBar from '@UI/components/SideBar/SideBar';
import {
    mapState,
} from 'vuex';

export default {
    name: 'WidgetsSideBar',
    components: {
        WidgetSideBarElement,
        SideBar,
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
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
