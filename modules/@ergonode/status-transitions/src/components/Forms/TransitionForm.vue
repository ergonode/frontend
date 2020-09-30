/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Status change"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <TranslationSelect
                    :value="source"
                    :required="true"
                    label="From"
                    :clearable="true"
                    :options="sourceOptions"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[sourceFieldKey]"
                    @input="setSourceValue" />
                <TranslationSelect
                    :value="destination"
                    :required="true"
                    label="To"
                    :clearable="true"
                    :options="destinationOptions"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[destinationFieldKey]"
                    @input="setDestinationValue" />
            </FormSection>
            <Divider />
            <FormSection title="Send notification to">
                <TranslationLazySelect
                    :value="roles"
                    :clearable="true"
                    :multiselect="true"
                    label="Role"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[roleFieldKey]"
                    :fetch-options-request="getRoleOptions"
                    @input="setRolesValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import Divider from '@Core/components/Dividers/Divider';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TranslationLazySelect from '@Core/components/Inputs/Select/TranslationLazySelect';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
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
    components: {
        Form,
        FormSection,
        Divider,
        TranslationLazySelect,
        TranslationSelect,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('statusTransition', [
            'source',
            'destination',
            'roles',
        ]),
        ...mapState('productStatus', [
            'statuses',
        ]),
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
            ]);
        },
        roleFieldKey() {
            return 'roleId';
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
        ...mapActions('role', [
            'getRoleOptions',
        ]),
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
        setRolesValue(value) {
            this.__setState({
                key: 'roles',
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'roles',
                value,
            });
        },
    },
};
</script>
