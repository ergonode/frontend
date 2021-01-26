/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Autocomplete
        :data-cy="dataCy"
        :value="value"
        :required="required"
        :searchable="true"
        :multiselect="multiselect"
        :clearable="clearable"
        :label="$t('productTemplate.autocomplete.productTemplate')"
        :custom-fetch-event="productTemplateCreatedEventName"
        :error-messages="errorMessages"
        :disabled="disabled"
        href="templates/autocomplete"
        @input="onValueChange">
        <template #noDataPlaceholder>
            <SelectListNoDataPlaceholder
                :title="noDataPlaceholder.title"
                :subtitle="noDataPlaceholder.subtitle"
                @click.native.prevent.stop>
                <template #action>
                    <CreateProductTemplateButton />
                </template>
            </SelectListNoDataPlaceholder>
        </template>
    </Autocomplete>
</template>

<script>
import CreateProductTemplateButton from '@Templates/components/Buttons/CreateProductTemplateButton';
import {
    PRODUCT_TEMPLATE_CREATED_EVENT_NAME,
} from '@Templates/defaults';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import SelectListNoDataPlaceholder from '@UI/components/SelectList/SelectListNoDataPlaceholder';

export default {
    name: 'ProductTemplateAutocomplete',
    components: {
        CreateProductTemplateButton,
        SelectListNoDataPlaceholder,
        Autocomplete,
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
                title: this.$t('productTemplate.autocomplete.productTemplateNoDataPlaceholderTitle'),
                subtitle: this.$t('productTemplate.autocomplete.productTemplateNoDataPlaceholderSubtitle'),
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
