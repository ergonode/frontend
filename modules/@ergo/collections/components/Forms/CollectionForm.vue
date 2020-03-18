/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
        :fields-keys="[typeIdFieldKey, codeFieldKey]">
        <template #body="{ errorMessages }">
            <FormGroup>
                <TextField
                    :value="code"
                    solid
                    required
                    :error-messages="errorMessages[codeFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    regular
                    label="System name"
                    hint="Product collection code must be unique"
                    @input="setCode" />
                <TranslationSelect
                    :value="type"
                    solid
                    required
                    label="Type"
                    regular
                    :disabled="isDisabledByPrivileges"
                    :options="types"
                    :error-messages="errorMessages[typeIdFieldKey]"
                    @input="setType" />
            </FormGroup>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'CollectionForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        TranslationSelect: () => import('@Core/components/Inputs/Select/TranslationSelect'),
    },
    computed: {
        ...mapState('collections', {
            id: state => state.id,
            code: state => state.code,
            type: state => state.type,
            types: state => state.types,
        }),
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['PRODUCT_COLLECTION_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['PRODUCT_COLLECTION_CREATE']));
        },
        isDisabled() {
            return Boolean(this.id);
        },
        typeIdFieldKey() {
            return 'typeId';
        },
        codeFieldKey() {
            return 'code';
        },
    },
    created() {
        this.getCollectionTypes();
    },
    methods: {
        ...mapActions('collections', [
            'setCode',
            'setType',
            'getCollectionTypes',
        ]),
    },
};
</script>
