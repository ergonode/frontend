/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :value="name"
                    required
                    :error-messages="errorMessages[nameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    label="Unit name"
                    hint="Unit name must be unique"
                    @input="setNameValue" />
                <TextField
                    :value="symbol"
                    required
                    :error-messages="errorMessages[symbolFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    label="Unit symbol"
                    hint="Unit symbol must be unique"
                    @input="setSymbolValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextField from '@Core/components/Inputs/TextField';
import PRIVILEGES from '@Core/config/privileges';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
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
    mixins: [
        formActionsMixin,
    ],
    props: {
        errors: {
            type: Object,
            default: () => ({}),
        },
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
        onProceed() {
            this.$emit('proceed');
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
