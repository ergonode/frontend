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
                @input="setConfiguration" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import JSONSchemaForm from '@Core/components/Form/JSONSchemaForm/JSONSchemaForm';

export default {
    name: 'CollectionBaseTab',
    components: {
        ResponsiveCenteredViewTemplate,
        JSONSchemaForm,
    },
    asyncData({ app, store }) {
        const { language: userLanguageCode } = store.state.authentication.user;

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
            'setConfiguration',
        ]),
    },
};
</script>
