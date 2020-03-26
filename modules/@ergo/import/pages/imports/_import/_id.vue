/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ImportProfilePage
        :title="name"
        @dismiss="onDismiss"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getParentRoutePath } from '@Core/models/navigation/tabs';
import { ALERT_TYPE } from '@Core/defaults/alerts';

export default {
    name: 'EditImportProfile',
    components: {
        ImportProfilePage: () => import('@Import/components/Pages/ImportProfilePage'),
    },
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({ store, params }) {
        await store.dispatch('import/getImportProfileById', {
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
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onSave() {
            this.removeValidationErrors();
            this.updateImportProfile({
                id: this.$route.params.id,
                data: { type: this.type, name: this.name, ...JSON.parse(this.configuration) },
                onSuccess: this.onUpdateImportProfileSuccess,
                onError: this.onError,
            });
        },
        onUpdateImportProfileSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Import profiles updated' });
        },
        onRemoveSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Import profiles removed' });
            this.$router.push({ name: 'import-grid' });
        },
    },
    head() {
        return {
            title: `${this.name} - Import profiles - Ergonode`,
        };
    },
};
</script>
