/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SideBar
        title="Conditions"
        :items="conditions">
        <template #body>
            <Preloader v-if="isPrefetchingData" />
        </template>
        <template #item="{ item }">
            <ConditionSideBarElement
                :item="item"
                :is-draggable="!disabled" />
        </template>
    </SideBar>
</template>

<script>
import ConditionSideBarElement from '@Conditions/components/SideBars/ConditionSideBarElement';
import Preloader from '@UI/components/Preloader/Preloader';
import SideBar from '@UI/components/SideBar/SideBar';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ConditionsSideBar',
    components: {
        Preloader,
        ConditionSideBarElement,
        SideBar,
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        group: {
            type: String,
            required: true,
        },
    },
    async fetch() {
        await this.getConditions({
            group: this.group,
            onSuccess: this.getConditionsSuccess,
            onError: this.getConditionsError,
        });
    },
    data() {
        return {
            conditions: [],
            isPrefetchingData: true,
        };
    },
    methods: {
        ...mapActions('condition', [
            'getConditions',
        ]),
        getConditionsSuccess(conditions) {
            this.conditions = conditions;

            this.isPrefetchingData = false;
        },
        getConditionsError() {
            this.isPrefetchingData = false;
        },
    },
};
</script>
