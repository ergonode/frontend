/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UnitPage
        :title="name"
        @remove="onRemove" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UnitEdit',
    components: {
        UnitPage: () => import('@Core/components/Pages/UnitPage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store,
        params,
    }) {
        await store.dispatch('unit/getUnit', {
            unitId: params.id,
        });
    },
    computed: {
        ...mapState('unit', {
            id: state => state.id,
            name: state => state.name,
        }),
    },
    destroyed() {
        this.clearUnitStorage();
    },
    methods: {
        ...mapActions('unit', {
            removeUnit: 'removeUnit',
            clearUnitStorage: '__clearStorage',
        }),
        ...mapActions('dictionaries', [
            'getDictionary',
        ]),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this unit?',
                confirmCallback: () => this.removeUnit({
                    onSuccess: this.onRemoveUnitSuccess,
                }),
            });
        },
        async onRemoveUnitSuccess() {
            await this.getDictionary({
                dictionaryName: 'units',
            });
            await this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Unit removed',
            });
            await this.$router.push({
                name: 'settings-units',
            });
        },
    },
    head() {
        return {
            title: `${this.name} - Units - Settings - Ergonode`,
        };
    },
};
</script>
