/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[nameFieldKey, symbolFieldKey]"
        @submit="onSubmit">
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
        <template #submit>
            <slot name="submitForm" />
        </template>
        <template #procced>
            <slot name="proceedForm" />
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextField from '@Core/components/Inputs/TextField';
import PRIVILEGES from '@Core/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UnitForm',
    components: {
        Form,
        FormSection,
        TextField,
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
        onSubmit() {
            this.$emit('submit');
        },
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
