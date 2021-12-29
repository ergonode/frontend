/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        :change-values="changeValues"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <SegmentsAutocomplete
                    :value="segments"
                    :multiselect="true"
                    :clearable="true"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[segmentsFieldKey]"
                    @input="onSegmentChange" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import SegmentsAutocomplete from '@Segments/components/Autocompletes/SegmentsAutocomplete';
import PRIVILEGES from '@Segments/config/privileges';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AddProductsFromSegmentForm',
    components: {
        SegmentsAutocomplete,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    props: {
        segments: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        segmentsFieldKey() {
            return 'segments';
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SEGMENT.update,
            ]);
        },
    },
    methods: {
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onSegmentChange(value) {
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.segmentsFieldKey,
                value,
            });

            this.$emit('input', value);
        },
    },
};
</script>
