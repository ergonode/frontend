/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Autocomplete
        :data-cy="dataCy"
        :value="value"
        :params="params"
        :required="required"
        :searchable="true"
        :multiselect="multiselect"
        :clearable="clearable"
        :label="label"
        :custom-fetch-event="attributeCreatedEventName"
        :error-messages="errorMessages"
        :disabled="disabled"
        :additional-static-options="additionalStaticOptions"
        href="attributes/autocomplete"
        @input="onValueChange">
        <template #noDataPlaceholder>
            <SelectListNoDataPlaceholder
                :title="noDataPlaceholder.title"
                :subtitle="noDataPlaceholder.subtitle">
                <template #action>
                    <CreateAttributeButton />
                </template>
            </SelectListNoDataPlaceholder>
        </template>
    </Autocomplete>
</template>

<script>
import CreateAttributeButton from '@Attributes/components/Buttons/CreateAttributeButton';
import {
    ATTRIBUTE_CREATED_EVENT_NAME,
} from '@Attributes/defaults';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import SelectListNoDataPlaceholder from '@UI/components/SelectList/SelectListNoDataPlaceholder';

export default {
    name: 'AttributesAutocomplete',
    components: {
        CreateAttributeButton,
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
        label: {
            type: String,
            default: '',
        },
        params: {
            type: Object,
            default: () => ({}),
        },
        additionalStaticOptions: {
            type: Array,
            default: () => [],
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
        noDataPlaceholder: {
            type: Object,
            default: () => ({
                title: '',
                subtitle: '',
            }),
        },
        dataCy: {
            type: String,
            default: '',
        },
    },
    computed: {
        attributeCreatedEventName() {
            return ATTRIBUTE_CREATED_EVENT_NAME;
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
