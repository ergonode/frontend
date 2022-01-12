/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Transitions.transition.components.TransitionForm.title')"
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
                    :value="from"
                    :required="true"
                    :label="$t('@Transitions.transition.components.TransitionForm.fromLabel')"
                    :options="fromOptions"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[fromFieldKey]"
                    option-key="key"
                    option-value="value"
                    @input="setFromValue" />
                <Select
                    :value="to"
                    :required="true"
                    :label="$t('@Transitions.transition.components.TransitionForm.toLabel')"
                    :options="toOptions"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[toFieldKey]"
                    option-key="key"
                    option-value="value"
                    @input="setToValue" />
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
import PRIVILEGES from '@Transitions/config/privileges';
import {
    getFromAndToTransition,
} from '@Workflow/models/workflowDesigner';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TransitionForm',
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('statusTransition', [
            'from',
            'to',
        ]),
        ...mapState('productStatus', [
            'statuses',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Transitions/components/Forms/TransitionForm',
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
            return this.statuses.filter(status => !this.to
                || status.id !== this.to.id);
        },
        toOptions() {
            return this.statuses.filter(status => !this.from
                || status.id !== this.from.id);
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
        ...mapActions('statusTransition', [
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
        setFromValue(value) {
            this.__setState({
                key: this.fromFieldKey,
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.fromFieldKey,
                value,
            });
        },
        setToValue(value) {
            this.__setState({
                key: this.toFieldKey,
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.toFieldKey,
                value,
            });
        },
    },
};
</script>
