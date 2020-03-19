/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[nameFieldKey, symbolFieldKey]">
        <template #body="{ errorMessages }">
            <FormGroup>
                <TextField
                    :value="name"
                    solid
                    required
                    :error-messages="errorMessages[nameFieldKey]"
                    :disabled="isDisabledByPrivileges"
                    regular
                    label="Unit name"
                    hint="Unit name must be unique"
                    @input="setName" />
                <TextField
                    :value="symbol"
                    solid
                    required
                    :error-messages="errorMessages[symbolFieldKey]"
                    :disabled="isDisabledByPrivileges"
                    regular
                    label="Unit symbol"
                    hint="Unit symbol must be unique"
                    @input="setSymbol" />
            </FormGroup>
        </template>
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
            return (this.isDisabled && !this.$hasAccess(['SETTINGS_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['SETTINGS_CREATE']));
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
            'setName',
            'setSymbol',
        ]),
    },
};
</script>
