/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
        :fields-keys="[typeIdFieldKey, codeFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :data-cy="dataCyGenerator(codeFieldKey)"
                    :value="code"
                    solid
                    required
                    :error-messages="errorMessages[codeFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    regular
                    label="System name"
                    hint="Product collection code must be unique"
                    @input="setCode" />
                <TranslationLazySelect
                    :data-cy="dataCyGenerator(typeIdFieldKey)"
                    :value="type"
                    solid
                    required
                    label="Type"
                    regular
                    :disabled="isDisabledByPrivileges"
                    :error-messages="errorMessages[typeIdFieldKey]"
                    :fetch-options-request="getCollectionTypesOptionsRequest"
                    @input="setType" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

const getCollectionTypesOptions = () => import('@Collections/services/getCollectionTypesOptions.service');

export default {
    name: 'CollectionForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        TranslationLazySelect: () => import('@Core/components/Inputs/Select/TranslationLazySelect'),
    },
    computed: {
        ...mapState('collections', {
            id: state => state.id,
            code: state => state.code,
            type: state => state.type,
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
    methods: {
        ...mapActions('collections', [
            'setCode',
            'setType',
        ]),
        getCollectionTypesOptionsRequest() {
            return getCollectionTypesOptions().then(response => response.default(
                { $axios: this.$axios, $store: this.$store },
            ));
        },
        dataCyGenerator(key) {
            return `collection-${key}`;
        },
    },
};
</script>
