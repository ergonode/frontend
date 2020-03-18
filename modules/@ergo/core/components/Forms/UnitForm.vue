/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form title="Options">
        <FormGroup>
            <TextField
                :value="name"
                solid
                regular
                required
                label="Unit name"
                :disabled="isDisabledByPrivileges"
                :error-messages="errorNameMessage"
                hint="Unit name must be unique"
                @input="setName" />
            <TextField
                :value="symbol"
                solid
                regular
                required
                label="Unit symbol"
                :disabled="isDisabledByPrivileges"
                :error-messages="errorSymbolMessage"
                hint="Unit symbol must be unique"
                @input="setSymbol" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '@Core/mixins/validations/errorValidationMixin';

export default {
    name: 'UnitForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        TextField: () => import('@Core/components/Inputs/TextField'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('units', {
            name: state => state.name,
            symbol: state => state.symbol,
        }),
        isDisabledByPrivileges() {
            return false;
            // return (this.isDisabled && !this.$hasAccess(['SETTINGS_UPDATE']))
            // || (!this.isDisabled && !this.$hasAccess(['SETTINGS_CREATE']));
        },
        errorNameMessage() {
            const codeIndex = 'name';
            return this.elementIsValidate(codeIndex);
        },
        errorSymbolMessage() {
            const codeIndex = 'symbol';
            return this.elementIsValidate(codeIndex);
        },
    },
    methods: {
        ...mapActions('units', [
            'setName',
            'setSymbol',
        ]),
    },
};
</script>
