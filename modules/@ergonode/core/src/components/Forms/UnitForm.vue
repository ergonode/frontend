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
                    :disabled="isDisabledByPrivileges"
                    label="Unit name"
                    hint="Unit name must be unique"
                    @input="setNameValue" />
                <TextField
                    :value="symbol"
                    required
                    :error-messages="errorMessages[symbolFieldKey]"
                    :disabled="isDisabledByPrivileges"
                    label="Unit symbol"
                    hint="Unit symbol must be unique"
                    @input="setSymbolValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
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
        ...mapState('units', {
            name: state => state.name,
            symbol: state => state.symbol,
        }),
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess([
                'SETTINGS_UPDATE',
            ]))
            || (!this.isDisabled && !this.$hasAccess([
                'SETTINGS_CREATE',
            ]));
        },
        nameFieldKey() {
            return 'name';
        },
        symbolFieldKey() {
            return 'symbol';
        },
    },
    methods: {
        ...mapActions('units', [
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
