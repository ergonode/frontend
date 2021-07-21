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
                <TranslationSelect
                    :value="source"
                    :required="true"
                    :label="$t('@Transitions.transition.components.TransitionForm.fromLabel')"
                    :options="sourceOptions"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[sourceFieldKey]"
                    @input="setSourceValue" />
                <TranslationSelect
                    :value="destination"
                    :required="true"
                    :label="$t('@Transitions.transition.components.TransitionForm.toLabel')"
                    :options="destinationOptions"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[destinationFieldKey]"
                    @input="setDestinationValue" />
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
            'source',
            'destination',
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
                    source,
                    destination,
                ] = id.split('--');

                return Boolean(source) && Boolean(destination);
            }
            return false;
        },
        sourceOptions() {
            return this.statuses.filter(status => !this.destination
                || status.id !== this.destination.id);
        },
        destinationOptions() {
            return this.statuses.filter(status => !this.source
                || status.id !== this.source.id);
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
        setSourceValue(value) {
            this.__setState({
                key: this.sourceFieldKey,
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.sourceFieldKey,
                value,
            });
        },
        setDestinationValue(value) {
            this.__setState({
                key: this.destinationFieldKey,
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.destinationFieldKey,
                value,
            });
        },
    },
};
</script>
