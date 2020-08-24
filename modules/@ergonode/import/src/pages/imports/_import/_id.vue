/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ImportProfilePage
        :title="name"
        @remove="onRemove"
        @save="onSave" />
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
            type: state => state.type,
            configuration: state => state.configuration,
        }),
        name() {
            const {
                name,
            } = JSON.parse(this.configuration);

            return name;
        },
    },
    destroyed() {
        this.__clearStorage();
    },
    methods: {
        ...mapActions('import', [
            '__clearStorage',
            'updateImportProfile',
            'removeImport',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this import?',
                confirmCallback: () => this.removeImport({
                    onSuccess: this.onRemoveSuccess,
                }),
            });
        },
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
