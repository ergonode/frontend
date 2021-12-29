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
        :multiselect="multiselect"
        :clearable="clearable"
        :label="$t('@AttributeGroups.attributeGroup.components.AttributeGroupsAutocomplete.groupLabel')"
        :custom-fetch-event="attributeGroupCreatedEventName"
        :error-messages="errorMessages"
        :wrap-value="true"
        option-key="id"
        option-value="label"
        :disabled="disabled"
        href="attributes/groups/autocomplete"
        @input="onValueChange">
        <template #noDataPlaceholder>
            <SelectListNoDataPlaceholder
                :title="noDataPlaceholder.title"
                :subtitle="noDataPlaceholder.subtitle">
                <template #action>
                    <CreateAttributeGroupButton />
                </template>
            </SelectListNoDataPlaceholder>
        </template>
    </Autocomplete>
</template>

<script>
import CreateAttributeGroupButton from '@AttributeGroups/components/Buttons/CreateAttributeGroupButton';
import {
    ATTRIBUTE_GROUP_CREATED_EVENT_NAME,
} from '@AttributeGroups/defaults';

export default {
    name: 'AttributeGroupsAutocomplete',
    components: {
        CreateAttributeGroupButton,
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
        attributeGroupCreatedEventName() {
            return ATTRIBUTE_GROUP_CREATED_EVENT_NAME;
        },
        noDataPlaceholder() {
            return {
                title: this.$t('@AttributeGroups.attributeGroup._.noGroups'),
                subtitle: this.$t('@AttributeGroups.attributeGroup._.createFirst'),
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
