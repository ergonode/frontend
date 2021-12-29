sw/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Workflow.workflow.components.WorkflowStatusForm.title')"
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
                    :value="status.code"
                    required
                    :error-messages="errors[codeFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :label="$t('@Workflow.workflow.components.WorkflowStatusForm.nameLabel')"
                    :hint="$t('@Workflow.workflow.components.WorkflowStatusForm.nameHint')"
                    @input="onCodeValueChange" />
                <ColorPicker
                    :data-cy="dataCyGenerator(colorFieldKey)"
                    :value="status.color"
                    required
                    :error-messages="errors[colorFieldKey]"
                    clearable
                    :dismissible="false"
                    :options="colorOptions"
                    :fixed-content="false"
                    :label="$t('@Workflow.workflow.components.WorkflowStatusForm.badgeLabel')"
                    :disabled="!isAllowedToUpdate"
                    @input="onColorValueChange">
                    <template #prepend>
                        <WorkflowStatusBadge
                            v-if="status.color"
                            :color="status.color"
                            :default-status="status.isDefaultStatus" />
                    </template>
                </ColorPicker>
                <Toggler
                    :value="status.isDefaultStatus"
                    :label="$t('@Workflow.workflow.components.WorkflowStatusForm.defaultStatusLabel')"
                    :disabled="!isAllowedToUpdate"
                    @input="onDefaultStatusValueChange">
                    <template #append>
                        <InfoHint :hint="$t('@Workflow.workflow.components.WorkflowStatusForm.defaultStatusHint')" />
                    </template>
                </Toggler>
                <WorkflowStatusPreview
                    :color="status.color"
                    :default-status="status.isDefaultStatus"
                    :label="status.code" />
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
    COLORS,
} from '@Core/defaults/colors';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import WorkflowStatusBadge from '@Workflow/components/Badges/WorkflowStatusBadge';
import WorkflowStatusPreview from '@Workflow/components/Inputs/WorkflowStatusPreview';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'WorkflowStatusForm',
    components: {
        WorkflowStatusBadge,
        WorkflowStatusPreview,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('workflow', [
            'status',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Workflow/components/Forms/WorkflowStatusForm',
            });
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.WORKFLOW.create,
            ]));
        },
        isDisabled() {
            return Boolean(this.status.id);
        },
        colorOptions() {
            return COLORS;
        },
        codeFieldKey() {
            return 'code';
        },
        colorFieldKey() {
            return 'color';
        },
        defaultStatusFieldKey() {
            return 'isDefaultStatus';
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
        onCodeValueChange(value) {
            this.__setState({
                key: 'status',
                value: {
                    ...this.status,
                    code: value,
                },
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.codeFieldKey,
                value,
            });
        },
        onColorValueChange(value) {
            this.__setState({
                key: 'status',
                value: {
                    ...this.status,
                    color: value,
                },
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.colorFieldKey,
                value,
            });
        },
        onDefaultStatusValueChange(value) {
            this.__setState({
                key: 'status',
                value: {
                    ...this.status,
                    isDefaultStatus: value,
                },
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.defaultStatusFieldKey,
                value,
            });
        },
        dataCyGenerator(key) {
            return `status-${key}`;
        },
    },
};
</script>
