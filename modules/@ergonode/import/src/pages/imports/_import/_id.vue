/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ImportProfilePage
        :title="name"
        @save="onSave" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditImportProfile',
    components: {
        ImportProfilePage: () => import('@Import/components/Pages/ImportProfilePage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store, params,
    }) {
        await store.dispatch('import/getImportProfile', {
            id: params.id,
        });
    },
    computed: {
        ...mapState('import', {
            name: state => state.name,
            type: state => state.type,
            configuration: state => state.configuration,
        }),
    },
    methods: {
        ...mapActions('import', [
            'updateImportProfile',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onSave() {
            this.removeValidationErrors();
            this.updateImportProfile({
                id: this.$route.params.id,
                data: {
                    type: this.type,
                    name: this.name,
                    ...JSON.parse(this.configuration),
                },
                onSuccess: this.onUpdateImportProfileSuccess,
                onError: this.onError,
            });
        },
        onUpdateImportProfileSuccess() {
            this.removeValidationErrors();
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Import profiles updated',
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Import profiles removed',
            });
            this.$router.push({
                name: 'import-grid',
            });
        },
    },
    head() {
        return {
            title: `${this.name} - Import profiles - Ergonode`,
        };
    },
};
</script>
