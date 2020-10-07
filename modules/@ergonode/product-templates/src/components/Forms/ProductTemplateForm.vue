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
                    :data-cy="dataCyGenerator(nameFieldKey)"
                    :value="title"
                    required
                    :error-messages="errors[nameFieldKey]"
                    label="Template name"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    @input="setTitleValue" />
                <UploadImageFile
                    :data-cy="dataCyGenerator('image')"
                    :value="image"
                    height="132px"
                    label="Template cover image"
                    :disabled="!isAllowedToUpdate"
                    @input="setImageValue" />
            </FormSection>
            <Divider v-if="extendedForm.length" />
            <template v-for="(field, index) in extendedForm">
                <Component
                    :is="field.component"
                    :key="index"
                    v-bind="bindingProps(field)" />
            </template>
        </template>
    </Form>
</template>

<script>
import Divider from '@Core/components/Dividers/Divider';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextField from '@Core/components/Inputs/TextField';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import UploadImageFile from '@Media/components/Inputs/UploadFile/UploadImageFile';
import PRIVILEGES from '@Templates/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateForm',
    components: {
        Divider,
        Form,
        FormSection,
        TextField,
        UploadImageFile,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('productTemplate', [
            'id',
            'title',
            'image',
        ]),
        extendedForm() {
            return this.$getExtendedFormByType({
                key: '@Templates/components/Forms/ProductTemplateForm',
            });
        },
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.TEMPLATE_DESIGNER.update,
            ]);
        },
        nameFieldKey() {
            return 'name';
        },
    },
    methods: {
        ...mapActions('productTemplate', [
            '__setState',
        ]),
        onSubmit() {
            this.$emit('submit');
        },
        setTitleValue(value) {
            this.__setState({
                key: 'title',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'title',
                value,
            });
        },
        setImageValue(value) {
            this.__setState({
                key: 'image',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'image',
                value,
            });
        },
        dataCyGenerator(key) {
            return `template-${key}`;
        },
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
    },
};
</script>
