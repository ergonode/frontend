/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
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
                    label="System name"
                    hint="System name must be unique"
                    @input="setCodeValue" />
                <CheckBox
                    :value="isDefaultStatus"
                    label="Default status of new products"
                    :disabled="!isAllowedToUpdate"
                    @input="setStatusAsDefaultValue">
                    <template #append>
                        <InfoHint hint="You may set only one status as a default" />
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
                    label="Badge color"
                    hint="Badge color is needed for presentation purpose"
                    :disabled="!isAllowedToUpdate"
                    @input="setColorValue" />
                <Divider v-if="extendedForm.length" />
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
import CheckBox from '@Core/components/CheckBox/CheckBox';
import ColorPicker from '@Core/components/ColorPicker/ColorPicker';
import Divider from '@Core/components/Dividers/Divider';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import InfoHint from '@Core/components/Hints/InfoHint';
import TextField from '@Core/components/TextField/TextField';
import {
    COLORS,
} from '@Core/defaults/colors';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import PRIVILEGES from '@Statuses/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductStatusForm',
    components: {
        Divider,
        Form,
        FormSection,
        TextField,
        ColorPicker,
        CheckBox,
        InfoHint,
    },
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
            ]);
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

<style lang="scss" scoped>
    .badge-preview {
        display: grid;
        grid-gap: 8px;

        &__badge {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30px;
        }
    }
</style>
