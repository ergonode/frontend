/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Segments.segment.components.SegmentForm.title')"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :disabled="!isAllowedToUpdate"
        :errors="errors"
        :change-values="changeValues"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <TextField
                    :data-cy="dataCyGenerator(codeFieldKey)"
                    :value="code"
                    required
                    :label="$t('@Segments.segment.components.SegmentForm.nameLabel')"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[codeFieldKey]"
                    :hint="$t('@Segments.segment.components.SegmentForm.nameHint')"
                    @input="setCodeValue" />
                <template v-for="(field, index) in extendedForm">
                    <Component
                        :is="field.component"
                        :key="index"
                        v-bind="bindingProps(field)" />
                </template>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import PRIVILEGES from '@Segments/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'SegmentForm',
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('segment', [
            'id',
            'code',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Segments/components/Forms/SegmentForm',
            });
        },
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SEGMENT.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.SEGMENT.create,
            ]));
        },
        codeFieldKey() {
            return 'code';
        },
    },
    methods: {
        ...mapActions('segment', [
            '__setState',
        ]),
        bindingProps({
            props,
        }) {
            return {
                scope: this.scope,
                changeValues: this.changeValues,
                errors: this.errors,
                disabled: !this.isAllowedToUpdate,
                ...props,
            };
        },
        setCodeValue(value) {
            this.__setState({
                key: this.codeFieldKey,
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.codeFieldKey,
                value,
            });
        },
        dataCyGenerator(key) {
            return `segment-${key}`;
        },
    },
};
</script>
