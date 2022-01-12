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
        :wrap-value="true"
        :clearable="clearable"
        :label="$t('@Segments.segment.components.SegmentsAutocomplete.label')"
        :custom-fetch-event="segmentCreatedEventName"
        :error-messages="errorMessages"
        :disabled="disabled"
        option-key="id"
        option-value="label"
        href="segments/autocomplete"
        @input="onValueChange">
        <template #noDataPlaceholder>
            <SelectListNoDataPlaceholder
                :title="noDataPlaceholder.title"
                :subtitle="noDataPlaceholder.subtitle">
                <template #action>
                    <CreateSegmentButton />
                </template>
            </SelectListNoDataPlaceholder>
        </template>
    </Autocomplete>
</template>

<script>
import CreateSegmentButton from '@Segments/components/Buttons/CreateSegmentButton';
import {
    SEGMENT_CREATED_EVENT_NAME,
} from '@Segments/defaults';

export default {
    name: 'SegmentsAutocomplete',
    components: {
        CreateSegmentButton,
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
        segmentCreatedEventName() {
            return SEGMENT_CREATED_EVENT_NAME;
        },
        noDataPlaceholder() {
            return {
                title: this.$t('@Segments.segment._.noSegments'),
                subtitle: this.$t('@Segments.segment._.createFirst'),
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
