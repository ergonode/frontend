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
        :label="$t('attribute.form.groupLabel')"
        :custom-fetch-event="attributeGroupCreatedEventName"
        :error-messages="errorMessages"
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
import CreateAttributeGroupButton from '@Attributes/components/Buttons/CreateAttributeGroupButton';
import {
    ATTRIBUTE_GROUP_CREATED_EVENT_NAME,
} from '@Attributes/defaults/attributes';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import SelectListNoDataPlaceholder from '@UI/components/SelectList/SelectListNoDataPlaceholder';

export default {
    name: 'AttributeGroupsAutocomplete',
    components: {
        CreateAttributeGroupButton,
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
        attributeGroupCreatedEventName() {
            return ATTRIBUTE_GROUP_CREATED_EVENT_NAME;
        },
        noDataPlaceholder() {
            return {
                title: this.$t('attributeGroup.form.noGroupTitle'),
                subtitle: this.$t('attributeGroup.form.noGroupSubtitle'),
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
