/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <Autocomplete
                    :value="segments"
                    :multiselect="true"
                    :searchable="true"
                    :clearable="true"
                    label="From segmentation rules"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[segmentsFieldKey]"
                    href="segments/autocomplete"
                    @input="onSegmentChange">
                    <template #placeholder="{ isVisible }">
                        <DropdownPlaceholder
                            v-if="isVisible"
                            :title="placeholder.title"
                            :subtitle="placeholder.subtitle">
                            <template #action>
                                <Button
                                    title="GO TO SEGMENTS"
                                    :size="smallSize"
                                    :disabled="!isAllowedToUpdate"
                                    @click.native="onNavigateToSegments" />
                            </template>
                        </DropdownPlaceholder>
                    </template>
                </Autocomplete>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import PRIVILEGES from '@Segments/config/privileges';
import {
    ROUTE_NAME,
} from '@Segments/config/routes';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import Button from '@UI/components/Button/Button';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';

export default {
    name: 'AddProductsFromSegmentForm',
    components: {
        Button,
        Form,
        FormSection,
        Autocomplete,
        DropdownPlaceholder,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    props: {
        errors: {
            type: Object,
            default: () => ({}),
        },
        segments: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        placeholder() {
            return {
                title: 'No segments',
                subtitle: 'There are no segments in the system, so you can create the first one.',
            };
        },
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
        onNavigateToSegments() {
            this.$router.push({
                name: ROUTE_NAME.SEGMENTS_GRID,
            });
        },
        onSegmentChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
