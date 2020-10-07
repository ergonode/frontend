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
                    :error-messages="errors[nameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    label="File name"
                    @input="setNameValue" />
                <UploadImageFile
                    :value="id"
                    disabled
                    label="Preview"
                    height="246px" />
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
import TextField from '@Core/components/Inputs/TextField';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import UploadImageFile from '@Media/components/Inputs/UploadFile/UploadImageFile';
import PRIVILEGES from '@Media/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ResourceForm',
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
        ...mapState('media', [
            'id',
            'name',
        ]),
        extendedForm() {
            return this.$getExtendedFormByType({
                key: '@Media/components/Forms/ResourceForm',
            });
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.MULTIMEDIA.update,
            ]);
        },
        nameFieldKey() {
            return 'name';
        },
    },
    methods: {
        ...mapActions('media', [
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
    },
};
</script>
