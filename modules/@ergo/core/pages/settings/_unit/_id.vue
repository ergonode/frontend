/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UnitPage
        :title="code"
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getParentRoutePath } from '@Core/models/navigation/tabs';
import { ALERT_TYPE } from '@Core/defaults/alerts';

export default {
    name: 'UnitEdit',
    components: {
        UnitPage: () => import('@Core/components/Pages/UnitPage'),
    },
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    computed: {
        ...mapState('units', {
            id: state => state.id,
            name: state => state.name,
            symbol: state => state.symbol,
        }),
    },
    destroyed() {
        this.clearUnitStorage();
    },
    methods: {
        ...mapActions('units', {
            updateUnit: 'updateUnit',
            removeUnit: 'removeUnit',
            clearUnitStorage: 'clearStorage',
        }),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onRemove() {
            const isConfirm = confirm('Are you sure you want to delete this unit?'); /* eslint-disable-line no-restricted-globals */

            if (isConfirm) {
                this.removeUnit({
                    onSuccess: this.onRemoveUnitSuccess,
                });
            }
        },
        onSave() {
            this.removeValidationErrors();

            this.updateUnit({
                id: this.id,
                data: { name: this.name, symbol: this.symbol },
                onSuccess: this.onUpdateUnitSuccess,
                onError: this.onError,
            });
        },
        onUpdateUnitSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Unit updated' });
        },
        onRemoveUnitSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Unit removed' });
            this.$router.push({ name: 'settings-units' });
        },
    },
    head() {
        return {
            title: `${this.code} - Units - Settings - Ergonode`,
        };
    },
};
</script>
