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
    fetch() {
        return this.$axios
            .$get(`${this.userLanguageCode}/sources/magento-1-csv/configuration`)
            .then((response) => {
                this.schema = response;
            });
    },
    data() {
        return {
            schema: {},
        };
    },
    computed: {
        ...mapState('import', {
            configuration: state => state.configuration,
        }),
        ...mapState('authentication', {
            userLanguageCode: state => state.user,
        }),
    },
    methods: {
        ...mapActions('import', [
            'setConfiguration',
        ]),
    },
};
</script>
