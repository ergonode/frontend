/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[nameFieldKey, symbolFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :value="name"
                    required
                    :error-messages="errorMessages[nameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    label="Unit name"
                    hint="System name must be unique"
                    @input="setNameValue" />
                <TextField
                    :value="symbol"
                    required
                    :error-messages="errorMessages[symbolFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    label="Unit symbol"
                    hint="System name must be unique"
                    @input="setSymbolValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Core/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UnitForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        TextField: () => import('@Core/components/Inputs/TextField'),
    },
    computed: {
        ...mapState('unit', {
            name: state => state.name,
            symbol: state => state.symbol,
        }),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.update,
            ]);
        },
        nameFieldKey() {
            return 'name';
        },
        symbolFieldKey() {
            return 'symbol';
        },
    },
    methods: {
        ...mapActions('unit', [
            '__setState',
        ]),
        setNameValue(value) {
            this.__setState({
                key: 'name',
                value,
            });
        },
        setSymbolValue(value) {
            this.__setState({
                key: 'symbol',
                value,
            });
        },
    },
};
</script>
