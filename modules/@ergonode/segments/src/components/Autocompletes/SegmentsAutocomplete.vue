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
        :label="$t('segment.form.segmentsLabel')"
        :custom-fetch-event="segmentCreatedEventName"
        :error-messages="errorMessages"
        :disabled="disabled"
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
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import SelectListNoDataPlaceholder from '@UI/components/SelectList/SelectListNoDataPlaceholder';

export default {
    name: 'SegmentsAutocomplete',
    components: {
        CreateSegmentButton,
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
        segmentCreatedEventName() {
            return SEGMENT_CREATED_EVENT_NAME;
        },
        noDataPlaceholder() {
            return {
                title: this.$t('segment.form.noSegmentsTitle'),
                subtitle: this.$t('segment.form.noSegmentsSubtitle'),
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
