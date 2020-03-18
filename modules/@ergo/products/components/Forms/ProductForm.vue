/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
        :fields-keys="[skuFieldKey, templateIdFieldKey]">
        <template #body="{ errorMessages }">
            <FormGroup>
                <TextField
                    :value="sku"
                    hint="Products SKU must be unique"
                    solid
                    regular
                    label="SKU"
                    required
                    :error-messages="errorMessages[skuFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    @input="setProductSku" />
                <TranslationSelect
                    :value="template"
                    :solid="true"
                    :required="true"
                    :regular="true"
                    label="Product template"
                    :error-messages="errorMessages[templateIdFieldKey]"
                    :options="templateOptions"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    @input="setProductTemplate" />
                <TranslationSelect
                    :value="selectedCategories"
                    :solid="true"
                    :regular="true"
                    :multiselect="true"
                    :clearable="true"
                    label="Category"
                    :options="categoryOptions"
                    :disabled="isDisabledByPrivileges"
                    @input="setProductCategories" />
            </FormGroup>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'ProductForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        TranslationSelect: () => import('@Core/components/Inputs/Select/TranslationSelect'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('productsDraft', {
            productID: state => state.id,
            sku: state => state.sku,
            template: state => state.template,
            templates: state => state.templates,
            selectedCategories: state => state.selectedCategories,
            categories: state => state.categories,
        }),
        templateOptions() {
            return this.templates.map(({ id, name }) => ({
                id, key: '', value: name, hint: '',
            }));
        },
        categoryOptions() {
            return this.categories.map(({ id, code, name }) => ({
                id, key: code, value: name, hint: name ? `#${code} ${this.userLanguageCode}` : '',
            }));
        },
        isDisabled() {
            return Boolean(this.productID);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['PRODUCT_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['PRODUCT_CREATE']));
        },
        templateIdFieldKey() {
            return 'templateId';
        },
        skuFieldKey() {
            return 'sku';
        },
    },
    methods: {
        ...mapActions('productsDraft', [
            'setProductSku',
            'setProductTemplate',
            'setProductCategories',
        ]),
    },
};
</script>
