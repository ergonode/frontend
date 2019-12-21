/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <FormGroup>
            <TextField
                :value="sku"
                hint="Products SKU must be unique"
                solid
                regular
                label="Sku"
                required
                :error-messages="errorSkuMessage"
                :disabled="isDisabled || isDisabledByPrivileges"
                @input="setProductSku" />
            <Select
                :value="template"
                solid
                required
                regular
                label="Template"
                :error-messages="errorTemplateMessage"
                :options="templateOptions"
                :disabled="isDisabled || isDisabledByPrivileges"
                @input="setProductTemplate" />
            <Select
                :value="selectedCategories"
                solid
                regular
                multiselect
                clearable
                is-list-element-hint
                :language-code="userLanguageCode"
                label="Category"
                :options="categoryOptions"
                :disabled="isDisabledByPrivileges"
                @input="setProductCategories" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'ProductForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        Select: () => import('@Core/components/Inputs/Select/Select'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('productsDraft', {
            productID: (state) => state.id,
            sku: (state) => state.sku,
            template: (state) => state.template,
            templates: (state) => state.templates,
            selectedCategories: (state) => state.selectedCategories,
            categories: (state) => state.categories,
        }),
        templateOptions() {
            return this.templates.map((language) => ({
                id: language.id,
                name: language.name,
            }));
        },
        categoryOptions() {
            return this.categories.map(
                (category) => ({
                    id: category.id,
                    name: category.name,
                    code: category.code,
                }),
            );
        },
        isDisabled() {
            return Boolean(this.productID);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['PRODUCT_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['PRODUCT_CREATE']));
        },
        errorSkuMessage() {
            const skuIndex = 'sku';
            return this.elementIsValidate(skuIndex);
        },
        errorTemplateMessage() {
            const templateIndex = 'templateId';
            return this.elementIsValidate(templateIndex);
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
