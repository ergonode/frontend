/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[nameFieldKey]"
        @submit="onSubmit">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :data-cy="dataCyGenerator(nameFieldKey)"
                    :value="templateTitle"
                    required
                    :error-messages="errorMessages[nameFieldKey]"
                    label="Template name"
                    :disabled="isDisabledByPrivileges"
                    @input="setTitleValue" />
                <UploadImageFile
                    :data-cy="dataCyGenerator('image')"
                    :value="templateImage"
                    height="132px"
                    label="Template cover image"
                    :disabled="isDisabledByPrivileges"
                    @input="setImageValue" />
            </FormSection>
            <FormSection title="Presentation product">
                <TranslationLazySelect
                    :data-cy="dataCyGenerator('default-label')"
                    :value="defaultTextAttribute"
                    required
                    label="Default label attribute"
                    :fetch-options-request="getDefaultTextAttributeOptionsRequest"
                    @input="setDefaultTextAttributeValue" />
                <TranslationLazySelect
                    :data-cy="dataCyGenerator('default-image')"
                    :value="defaultImageAttribute"
                    clearable
                    label="Default image attribute"
                    :fetch-options-request="getDefaultImageAttributeOptionsRequest"
                    @input="setDefaultImageAttributeValue" />
            </FormSection>
        </template>
        <template #submit>
            <slot name="submitForm" />
        </template>
        <template #cancel>
            <slot name="cancelForm" />
        </template>
    </Form>
</template>

<script>
import {
    TYPES,
} from '@Attributes/defaults/attributes';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TranslationLazySelect from '@Core/components/Inputs/Select/TranslationLazySelect';
import TextField from '@Core/components/Inputs/TextField';
import UploadImageFile from '@Media/components/Inputs/UploadFile/UploadImageFile';
import PRIVILEGES from '@Templates/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

const getAttributesOptionsByType = () => import('@Attributes/services/getAttributesOptionsByType.service');

export default {
    name: 'TemplateDesignerForm',
    components: {
        Form,
        FormSection,
        TextField,
        TranslationLazySelect,
        UploadImageFile,
    },
    computed: {
        ...mapState('productTemplate', {
            templateTitle: state => state.title,
            templateImage: state => state.image,
            defaultTextAttribute: state => state.defaultTextAttribute,
            defaultImageAttribute: state => state.defaultImageAttribute,
        }),
        isDisabled() {
            return Boolean(this.templateTitle);
        },
        isDisabledByPrivileges() {
            return !this.$hasAccess([
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
        },
        setImageValue(value) {
            this.__setState({
                key: 'image',
                value,
            });
        },
        setDefaultTextAttributeValue(value) {
            this.__setState({
                key: 'defaultTextAttribute',
                value,
            });
        },
        setDefaultImageAttributeValue(value) {
            this.__setState({
                key: 'defaultImageAttribute',
                value,
            });
        },
        getDefaultTextAttributeOptionsRequest() {
            return getAttributesOptionsByType().then(response => response.default(
                {
                    $axios: this.$axios,
                    $store: this.$store,
                    type: TYPES.TEXT,
                },
            ));
        },
        getDefaultImageAttributeOptionsRequest() {
            return getAttributesOptionsByType().then(response => response.default(
                {
                    $axios: this.$axios,
                    $store: this.$store,
                    type: TYPES.IMAGE,
                },
            ));
        },
        dataCyGenerator(key) {
            return `template-${key}`;
        },
    },
};
</script>
