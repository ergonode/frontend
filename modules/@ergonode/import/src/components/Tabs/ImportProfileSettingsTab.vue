/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <JSONSchemaForm
                :value="configuration"
                :schema="schema"
                @input="setConfigurationValue" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import JSONSchemaForm from '@Core/components/Form/JSONSchemaForm/JSONSchemaForm';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CollectionGeneralTab',
    components: {
        CenterViewTemplate,
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
