/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UnitPage :title="name" />
</template>

<script>
import UnitPage from '@Core/components/Pages/UnitPage';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UnitEdit',
    components: {
        UnitPage,
    },
    mixins: [
        beforeLeavePageMixin,
    ],
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        app,
        store,
        params,
    }) {
        await store.dispatch('unit/getUnit', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Unit hasn`t been fetched properly',
                });
            },
        });
    },
    computed: {
        ...mapState('unit', [
            'name',
        ]),
    },
    beforeDestroy() {
        this.clearUnitStorage();
    },
    methods: {
        ...mapActions('unit', {
            clearUnitStorage: '__clearStorage',
        }),
    },
    head() {
        return {
            title: `${this.name} - Units - Settings - Ergonode`,
        };
    },
};
</script>
