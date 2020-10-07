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
                    :value="name"
                    required
                    label="Role name"
                    hint="Role name must be unique"
                    :error-messages="errors[nameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setNameValue" />
                <TextArea
                    :value="description"
                    label="Role description"
                    resize="none"
                    height="150px"
                    :error-messages="errors[descriptionFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setDescriptionValue" />
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
import Divider from '@Core/components/Dividers/Divider';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextArea from '@Core/components/Inputs/TextArea';
import TextField from '@Core/components/Inputs/TextField';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import PRIVILEGES from '@Users/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UserRoleForm',
    components: {
        Divider,
        Form,
        FormSection,
        TextField,
        TextArea,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('role', [
            'name',
            'description',
        ]),
        extendedForm() {
            return this.$getExtendedFormByType({
                key: '@Users/components/Forms/UserRoleForm',
            });
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER_ROLE.update,
            ]);
        },
        descriptionFieldKey() {
            return 'description';
        },
        nameFieldKey() {
            return 'name';
        },
    },
    methods: {
        ...mapActions('role', [
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
        onSubmit() {
            this.$emit('submit');
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
        setDescriptionValue(value) {
            this.__setState({
                key: this.descriptionFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.descriptionFieldKey,
                value,
            });
        },
    },
};
</script>
