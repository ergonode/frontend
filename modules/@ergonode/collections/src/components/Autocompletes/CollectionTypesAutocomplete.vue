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
        :label="$t('@Collections.collection.components.CollectionTypesAutocomplete.label')"
        :custom-fetch-event="collectionCreatedEventName"
        :error-messages="errorMessages"
        :disabled="disabled"
        option-key="id"
        option-value="label"
        href="collections/type/autocomplete"
        @input="onValueChange">
        <template #noDataPlaceholder>
            <SelectListNoDataPlaceholder
                :title="noDataPlaceholder.title"
                :subtitle="noDataPlaceholder.subtitle" />
        </template>
    </Autocomplete>
</template>

<script>
import {
    COLLECTION_CREATED_EVENT_NAME,
} from '@Collections/defaults';

export default {
    name: 'CollectionTypesAutocomplete',
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
        collectionCreatedEventName() {
            return COLLECTION_CREATED_EVENT_NAME;
        },
        noDataPlaceholder() {
            return {
                title: this.$t('@Collections.collection._.noCollectionType'),
                subtitle: this.$t('@Collections.collection._.noCollectionTypeDescription'),
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
