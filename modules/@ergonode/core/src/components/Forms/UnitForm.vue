/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Core.core.components.UnitForm.title')"
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
                    :data-cy="dataCyGenerator(nameFieldKey)"
                    :value="name"
                    required
                    :error-messages="errors[nameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    :label="$t('@Core.core.components.UnitForm.nameLabel')"
                    :hint="$t('@Core.core.components.UnitForm.nameHint')"
                    @input="setNameValue" />
                <TextField
                    :data-cy="dataCyGenerator(symbolFieldKey)"
                    :value="symbol"
                    required
                    :error-messages="errors[symbolFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    :label="$t('@Core.core.components.UnitForm.symbolLabel')"
                    :hint="$t('@Core.core.components.UnitForm.symbolHint')"
                    @input="setSymbolValue" />
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
import PRIVILEGES from '@Core/config/privileges';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UnitForm',
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('unit', [
            'id',
            'name',
            'symbol',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Core/components/Forms/UnitForm',
            });
        },
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.SETTINGS.create,
            ]));
        },
        nameFieldKey() {
            return 'name';
        },
        symbolFieldKey() {
            return 'symbol';
        },
    },
    methods: {
        ...mapActions('unit', [
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
        setNameValue(value) {
            this.__setState({
                key: this.nameFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.nameFieldKey,
                value,
            });
        },
        setSymbolValue(value) {
            this.__setState({
                key: this.symbolFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.symbolFieldKey,
                value,
            });
        },
        dataCyGenerator(key) {
            return `unit-${key}`;
        },
    },
};
</script>
