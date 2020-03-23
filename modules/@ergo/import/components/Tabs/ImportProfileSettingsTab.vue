/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <JSONSchemaForm :schema="schema" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import JSONSchemaForm from '@Core/components/Form/JSONSchemaForm';

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
    methods: {
        onValueChange(payload) {
            console.log(payload);
        },
    },
};
</script>
