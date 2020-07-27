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
                    required
                    :error-messages="errorMessages[codeFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    label="System name"
                    hint="Product collection code must be unique"
                    @input="setCodeValue" />
                <TranslationLazySelect
                    :data-cy="dataCyGenerator(typeIdFieldKey)"
                    :value="type"
                    required
                    label="Type"
                    :disabled="isDisabledByPrivileges"
                    :error-messages="errorMessages[typeIdFieldKey]"
                    :fetch-options-request="getCollectionTypesOptionsRequest"
                    @input="setTypeValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Collections/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

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
            return (this.isDisabled && !this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]))
            || (!this.isDisabled && !this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.create,
            ]));
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
            '__setState',
        ]),
        setCodeValue(value) {
            this.__setState({
                key: 'code',
                value,
            });
        },
        setTypeValue(value) {
            this.__setState({
                key: 'type',
                value,
            });
        },
        getCollectionTypesOptionsRequest() {
            return getCollectionTypesOptions().then(response => response.default(
                {
                    $axios: this.$axios,
                    $store: this.$store,
                },
            ));
        },
        dataCyGenerator(key) {
            return `collection-${key}`;
        },
    },
};
</script>
