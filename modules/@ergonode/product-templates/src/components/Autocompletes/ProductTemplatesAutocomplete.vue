/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Autocomplete
        :data-cy="dataCy"
        :value="value"
        :required="required"
        :searchable="true"
        :wrap-value="true"
        :multiselect="multiselect"
        :clearable="clearable"
        :label="$t('@Templates.productTemplate.components.ProductTemplateAutocomplete.label')"
        :custom-fetch-event="productTemplateCreatedEventName"
        :error-messages="errorMessages"
        :disabled="disabled"
        :sort-order="sortOrder"
        option-key="id"
        option-value="label"
        href="templates/autocomplete"
        @input="onValueChange">
        <template #noDataPlaceholder>
            <SelectListNoDataPlaceholder
                :title="noDataPlaceholder.title"
                :subtitle="noDataPlaceholder.subtitle">
                <template #action>
                    <CreateProductTemplateButton />
                </template>
            </SelectListNoDataPlaceholder>
        </template>
    </Autocomplete>
</template>

<script>
import {
    SORTING_ORDER,
} from '@Core/defaults/icons';
import CreateProductTemplateButton from '@Templates/components/Buttons/CreateProductTemplateButton';
import {
    PRODUCT_TEMPLATE_CREATED_EVENT_NAME,
} from '@Templates/defaults';

export default {
    name: 'ProductTemplateAutocomplete',
    components: {
        CreateProductTemplateButton,
    },
    props: {
        value: {
            type: [
                String,
                Array,
            ],
            default: '',
        },
        errorMessages: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        multiselect: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        dataCy: {
            type: String,
            default: '',
        },
    },
    computed: {
        productTemplateCreatedEventName() {
            return PRODUCT_TEMPLATE_CREATED_EVENT_NAME;
        },
        noDataPlaceholder() {
            return {
                title: this.$t('@Templates.productTemplate._.noTemplate'),
                subtitle: this.$t('@Templates.productTemplate._.createFirst'),
            };
        },
        sortOrder() {
            return {
                order: SORTING_ORDER.ASC,
                field: 'label',
            };
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
