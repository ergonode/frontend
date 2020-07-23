/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <JSONSchemaForm
                :value="configuration"
                :schema="schema"
                @input="setConfigurationValue" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import JSONSchemaForm from '@Core/components/Form/JSONSchemaForm/JSONSchemaForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CollectionGeneralTab',
    components: {
        ResponsiveCenteredViewTemplate,
        JSONSchemaForm,
    },
    asyncData({
        app, store,
    }) {
        const {
            language: userLanguageCode,
        } = store.state.authentication.user;

        return app.$axios.$get(`${userLanguageCode}/sources/magento-1-csv/configuration`).then(response => ({
            schema: response,
        }));
    },
    computed: {
        ...mapState('import', {
            configuration: state => state.configuration,
        }),
    },
    methods: {
        ...mapActions('import', [
            '__setState',
        ]),
        setConfigurationValue(value) {
            this.__setState({
                key: 'configuration',
                value,
            });
        },
    },
};
</script>
