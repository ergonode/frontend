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
                <TranslationSelect
                    :data-cy="dataCyGenerator(sourceFieldKey)"
                    :value="transition.source"
                    :required="true"
                    :label="$t('@Workflow.workflow.components.WorkflowTransitionForm.fromLabel')"
                    :options="sourceOptions"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[sourceFieldKey]"
                    @input="onSourceValueChange" />
                <TranslationSelect
                    :data-cy="dataCyGenerator(destinationFieldKey)"
                    :value="transition.destination"
                    :required="true"
                    :label="$t('@Workflow.workflow.components.WorkflowTransitionForm.toLabel')"
                    :options="destinationOptions"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[destinationFieldKey]"
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
import Button from '@UI/components/Button/Button';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import TranslationSelect from '@UI/components/Select/TranslationSelect';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'WorkflowTransitionForm',
    components: {
        Button,
        Form,
        FormSection,
        TranslationSelect,
    },
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
                ] = id.split('--');

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
