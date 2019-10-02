/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard>
        <TextField
            :value="sku"
            hint="Products SKU must be unique"
            solid
            regular
            label="Sku"
            required
            :error-messages="errorSkuMessage"
            :disabled="isDisabled || isDisabledByPrivileges"
            @input="(sku) => setProductSku(sku)" />
        <Select
            :value="template"
            solid
            required
            regular
            label="Template"
            :error-messages="errorTemplateMessage"
            :options="templateValues"
            :disabled="isDisabled || isDisabledByPrivileges"
            @input="(template) => setProductTemplate(template)" />
        <Select
            :value="selectedCategories"
            solid
            regular
            multiselect
            label="Category"
            clearable
            :disabled="isDisabledByPrivileges"
            @input="clearContent">
            <template #selectContent>
                <TranslationMultiselectListContent
                    :options="categoryOptions"
                    :selected-options="selectedCategories"
                    @values="onCategoriesChange" />
            </template>
        </Select>
        <slot />
    </BaseCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BaseCard from '~/components/Card/BaseCard';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'ProductBaseCard',
    components: {
        BaseCard,
        TextField: () => import('~/components/Inputs/TextField'),
        Select: () => import('~/components/Inputs/Select/Select'),
        TranslationMultiselectListContent: () => import('~/components/Inputs/Select/Contents/TranslationMultiselectListContent'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('productsDraft', {
            productID: (state) => state.id,
            sku: (state) => state.sku,
            template: (state) => state.template,
            templates: (state) => state.templates,
            selectedCategories: (state) => state.selectedCategories,
            categories: (state) => state.categories,
        }),
        templateValues() {
            return this.templates.map((template) => template.name);
        },
        categoryOptions() {
            return this.categories.map(
                (category) => ({ key: category.code, value: category.name }),
            );
        },
        isDisabled() {
            return Boolean(this.productID);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess('PRODUCT_UPDATE'))
            || (!this.isDisabled && !this.$hasAccess('PRODUCT_CREATE'));
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
        onCategoriesChange(categories) {
            this.setProductCategories(categories);
        },
        clearContent() {
            this.setProductCategories();
        },
    },
};
</script>
