/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
                    :data-cy="dataCyGenerator(fromFieldKey)"
                    :value="transition.from"
                    :required="true"
                    :label="$t('@Workflow.workflow.components.WorkflowTransitionForm.fromLabel')"
                    :options="fromOptions"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[fromFieldKey]"
                    option-key="key"
                    option-value="value"
                    @input="onFromValueChange" />
                <Select
                    :data-cy="dataCyGenerator(toFieldKey)"
                    :value="transition.to"
                    :required="true"
                    :label="$t('@Workflow.workflow.components.WorkflowTransitionForm.toLabel')"
                    :options="toOptions"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[toFieldKey]"
                    option-key="key"
                    option-value="value"
                    @input="onToValueChange" />
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
    getFromAndToTransition,
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
                    from,
                    to,
                ] = getFromAndToTransition(id);

                return Boolean(from) && Boolean(to);
            }
            return false;
        },
        fromOptions() {
            return this.statuses.filter(status => !this.transition.to
                || status.id !== this.transition.to.id);
        },
        toOptions() {
            return this.statuses.filter(status => !this.transition.from
                || status.id !== this.transition.from.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.WORKFLOW.create,
            ]));
        },
        toFieldKey() {
            return 'to';
        },
        fromFieldKey() {
            return 'from';
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
        onFromValueChange(value) {
            this.__setState({
                key: 'transition',
                value: {
                    ...this.transition,
                    from: value,
                },
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.fromFieldKey,
                value,
            });
        },
        onToValueChange(value) {
            this.__setState({
                key: 'transition',
                value: {
                    ...this.transition,
                    to: value,
                },
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.toFieldKey,
                value,
            });
        },
        dataCyGenerator(key) {
            return `transition-${key}`;
        },
    },
};
</script>
