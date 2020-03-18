/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
        :fields-keys="[codeFieldKey]">
        <template #body="{ errorMessages }">
            <FormGroup>
                <TextField
                    :value="code"
                    solid
                    regular
                    required
                    :error-messages="errorMessages[codeFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    label="System name"
                    hint="Attribute group code must be unique"
                    @input="setAttributeGroupCode" />
            </FormGroup>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'AttributeGroupForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        TextField: () => import('@Core/components/Inputs/TextField'),
    },
    computed: {
        ...mapState('attributeGroup', {
            attributeID: state => state.id,
            code: state => state.code,
        }),
        isDisabled() {
            return Boolean(this.attributeID);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['ATTRIBUTE_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['ATTRIBUTE_CREATE']));
        },
        codeFieldKey() {
            return 'code';
        },
    },
    methods: {
        ...mapActions('attributeGroup', ['setAttributeGroupCode']),
    },
};
</script>
