sw/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Statuses.productStatus.components.ProductStatusForm.title')"
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
                    :error-messages="errors[codeFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :label="$t('@Statuses.productStatus.components.ProductStatusForm.nameLabel')"
                    :hint="$t('@Statuses.productStatus.components.ProductStatusForm.nameHint')"
                    @input="setCodeValue" />
                <CheckBox
                    :value="isDefaultStatus"
                    :label="$t('@Statuses.productStatus.components.ProductStatusForm.defaultStatusLabel')"
                    :disabled="!isAllowedToUpdate"
                    @input="setStatusAsDefaultValue">
                    <template #append>
                        <InfoHint :hint="$t('@Statuses.productStatus.components.ProductStatusForm.defaultStatusHint')" />
                    </template>
                </CheckBox>
                <ColorPicker
                    :data-cy="dataCyGenerator(colorFieldKey)"
                    :value="color"
                    required
                    :error-messages="errors[colorFieldKey]"
                    clearable
                    :dismissible="false"
                    :options="colorOptions"
                    :fixed-content="false"
                    :label="$t('@Statuses.productStatus.components.ProductStatusForm.badgeLabel')"
                    :hint="$t('@Statuses.productStatus.components.ProductStatusForm.badgeHint')"
                    :disabled="!isAllowedToUpdate"
                    @input="setColorValue" />
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
import PRIVILEGES from '@Statuses/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductStatusForm',
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('productStatus', [
            'id',
            'code',
            'color',
            'isDefaultStatus',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Statuses/components/Forms/ProductStatusForm',
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
            return Boolean(this.id);
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
    },
    methods: {
        ...mapActions('productStatus', [
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
        setColorValue(value) {
            this.__setState({
                key: this.colorFieldKey,
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.colorFieldKey,
                value,
            });
        },
        setStatusAsDefaultValue(value) {
            this.__setState({
                key: 'isDefaultStatus',
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'isDefaultStatus',
                value,
            });
        },
        dataCyGenerator(key) {
            return `status-${key}`;
        },
    },
};
</script>
