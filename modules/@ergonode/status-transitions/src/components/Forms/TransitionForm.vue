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
                <Autocomplete
                    :value="roles"
                    :clearable="true"
                    :multiselect="true"
                    :searchable="true"
                    label="Role"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[roleFieldKey]"
                    href="roles/autocomplete"
                    @input="setRolesValue">
                    <DropdownPlaceholder
                        :title="placeholder.title"
                        :subtitle="placeholder.subtitle">
                        <template #action>
                            <Button
                                title="GO TO USER ROLES"
                                :size="smallSize"
                                :disabled="!isAllowedToUpdate"
                                @click.native="onNavigateToUserRoles" />
                        </template>
                    </DropdownPlaceholder>
                </Autocomplete>
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
import {
    SIZE,
} from '@Core/defaults/theme';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import {
    isEmpty,
} from '@Core/models/objectWrapper';
import PRIVILEGES from '@Transitions/config/privileges';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import Divider from '@UI/components/Dividers/Divider';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import TranslationSelect from '@UI/components/Select/TranslationSelect';
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
        Autocomplete,
        TranslationSelect,
        DropdownPlaceholder,
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
        smallSize() {
            return SIZE.SMALL;
        },
        placeholder() {
            return {
                title: 'No user roles',
                subtitle: 'There are no user roles in the system, so you can create the first one.',
            };
        },
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
        onNavigateToUserRoles() {
            this.$router.push({
                name: 'user-roles-grid',
            });
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
