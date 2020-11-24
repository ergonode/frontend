/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ImportProfilePage :title="name" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import ImportProfilePage from '@Import/components/Pages/ImportProfilePage';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditImportProfile',
    components: {
        ImportProfilePage,
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
        await store.dispatch('import/getImportProfile', {
            id: params.id,
            onError: () => {
                if (process.client) {
                    app.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: 'Import profile hasn`t been fetched properly',
                    });
                }
            },
        });
    },
    computed: {
        ...mapState('import', [
            'configuration',
        ]),
        name() {
            const {
                name,
            } = JSON.parse(this.configuration);

            return name;
        },
    },
    beforeDestroy() {
        this.__clearStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('import', [
            '__clearStorage',
        ]),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
    },
    head() {
        return {
            title: `${this.name} - Import profiles - Ergonode`,
        };
    },
};
</script>
