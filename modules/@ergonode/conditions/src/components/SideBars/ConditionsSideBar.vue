/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SideBar
        title="Conditions"
        :items="items">
        <template #item="{ item }">
            <ConditionSideBarElement
                :item="item"
                :is-draggable="!disabled" />
        </template>
    </SideBar>
</template>

<script>
import ConditionSideBarElement from '@Conditions/components/SideBars/ConditionSideBarElement';
import SideBar from '@UI/components/SideBar/SideBar';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ConditionsSideBar',
    components: {
        ConditionSideBarElement,
        SideBar,
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('condition', {
            items: state => state.conditionsDictionary,
        }),
    },
};
</script>
