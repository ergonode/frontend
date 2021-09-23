/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Workflow.workflow.components.WorkflowTransitionForm.title')"
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
                <Select
                    :data-cy="dataCyGenerator(sourceFieldKey)"
                    :value="transition.source"
                    :required="true"
                    :label="$t('@Workflow.workflow.components.WorkflowTransitionForm.fromLabel')"
                    :options="sourceOptions"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[sourceFieldKey]"
                    option-key="key"
                    option-value="value"
                    @input="onSourceValueChange" />
                <Select
                    :data-cy="dataCyGenerator(destinationFieldKey)"
                    :value="transition.destination"
                    :required="true"
                    :label="$t('@Workflow.workflow.components.WorkflowTransitionForm.toLabel')"
                    :options="destinationOptions"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[destinationFieldKey]"
                    option-key="key"
                    option-value="value"
                    @input="onDestinationValueChange" />
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
import {
    isEmpty,
} from '@Core/models/objectWrapper';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    getSourceAndDestination,
} from '@Workflow/models/workflowDesigner';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'WorkflowTransitionForm',
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('workflow', [
            'transition',
            'statuses',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Workflow/components/Forms/WorkflowTransitionForm',
            });
        },
        isDisabled() {
            if (!isEmpty(this.$route.params)) {
                const {
                    id,
                } = this.$route.params;
                const [
                    source,
                    destination,
                ] = getSourceAndDestination(id);

                return Boolean(source) && Boolean(destination);
            }
            return false;
        },
        sourceOptions() {
            return this.statuses.filter(status => !this.transition.destination
                || status.id !== this.transition.destination.id);
        },
        destinationOptions() {
            return this.statuses.filter(status => !this.transition.source
                || status.id !== this.transition.source.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.WORKFLOW.create,
            ]));
        },
        destinationFieldKey() {
            return 'destination';
        },
        sourceFieldKey() {
            return 'source';
        },
    },
    methods: {
        ...mapActions('workflow', [
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
        onSourceValueChange(value) {
            this.__setState({
                key: 'transition',
                value: {
                    ...this.transition,
                    source: value,
                },
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.sourceFieldKey,
                value,
            });
        },
        onDestinationValueChange(value) {
            this.__setState({
                key: 'transition',
                value: {
                    ...this.transition,
                    destination: value,
                },
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.destinationFieldKey,
                value,
            });
        },
        dataCyGenerator(key) {
            return `transition-${key}`;
        },
    },
};
</script>
