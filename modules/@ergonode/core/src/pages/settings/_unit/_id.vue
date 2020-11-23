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
import UnitPage from '@Core/components/Pages/UnitPage';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
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
                if (process.client) {
                    app.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: 'Unit hasn`t been fetched properly',
                    });
                }
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
            removeUnit: 'removeUnit',
            clearUnitStorage: '__clearStorage',
        }),
        ...mapActions('dictionaries', [
            'getDictionary',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: 'Are you sure you want to delete this unit?',
                applyTitle: 'YES, REMOVE',
                action: () => this.removeUnit({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        async onRemoveSuccess() {
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
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Unit hasn`t been deleted',
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
