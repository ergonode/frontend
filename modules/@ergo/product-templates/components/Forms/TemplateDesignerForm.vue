/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
        :fields-keys="[nameFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :data-cy="dataCyGenerator(nameFieldKey)"
                    :value="templateTitle"
                    solid
                    required
                    regular
                    :error-messages="errorMessages[nameFieldKey]"
                    label="Template name"
                    :disabled="isDisabledByPrivileges"
                    @input="setTitle" />
                <UploadImageFile
                    :data-cy="dataCyGenerator('image')"
                    :value="templateImage"
                    label="Template cover image"
                    :disabled="isDisabledByPrivileges"
                    @upload="setImage"
                    @remove="setImage" />
            </FormSection>
            <FormSection title="Presentation product">
                <TranslationLazySelect
                    :data-cy="dataCyGenerator('default-label')"
                    :value="defaultTextAttribute"
                    solid
                    regular
                    required
                    label="Default label attribute"
                    :fetch-options-request="getDefaultTextAttributeOptionsRequest"
                    @input="setDefaultTextAttribute" />
                <TranslationLazySelect
                    :data-cy="dataCyGenerator('default-image')"
                    :value="defaultImageAttribute"
                    solid
                    regular
                    clearable
                    label="Default image attribute"
                    :fetch-options-request="getDefaultImageAttributeOptionsRequest"
                    @input="setDefaultImageAttribute" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { TYPES } from '@Attributes/defaults/attributes';

const getAttributesOptionsByType = () => import('@Attributes/services/getAttributesOptionsByType.service');

export default {
    name: 'TemplateDesignerForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        TranslationLazySelect: () => import('@Core/components/Inputs/Select/TranslationLazySelect'),
        UploadImageFile: () => import('@Core/components/Inputs/UploadFile/UploadImageFile'),
    },
    computed: {
        ...mapState('templateDesigner', {
            templateTitle: state => state.title,
            templateImage: state => state.image,
            defaultTextAttribute: state => state.defaultTextAttribute,
            defaultImageAttribute: state => state.defaultImageAttribute,
        }),
        isDisabled() {
            return Boolean(this.templateTitle);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['TEMPLATE_DESIGNER_UPDATE']))
                || (!this.isDisabled && !this.$hasAccess(['TEMPLATE_DESIGNER_CREATE']));
        },
        nameFieldKey() {
            return 'name';
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'setTitle',
            'setImage',
            'setDefaultImageAttribute',
            'setDefaultTextAttribute',
        ]),
        getDefaultTextAttributeOptionsRequest() {
            return getAttributesOptionsByType().then(response => response.default(
                { $axios: this.$axios, $store: this.$store, type: TYPES.TEXT },
            ));
        },
        getDefaultImageAttributeOptionsRequest() {
            return getAttributesOptionsByType().then(response => response.default(
                { $axios: this.$axios, $store: this.$store, type: TYPES.IMAGE },
            ));
        },
        dataCyGenerator(key) {
            return `template-${key}`;
        },
    },
};
</script>
