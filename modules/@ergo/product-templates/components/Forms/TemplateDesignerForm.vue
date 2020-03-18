/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form title="General">
        <FormGroup>
            <TextField
                :value="templateTitle"
                solid
                required
                regular
                :error-messages="errorNameMessage"
                label="Template name"
                :disabled="isDisabledByPrivileges"
                @input="setTitle" />
            <UploadImage
                :value="templateImage"
                label="Template cover image"
                :disabled="isDisabledByPrivileges"
                @upload="setImage"
                @remove="setImage" />
        </FormGroup>
        <FormGroup title="Presentation product">
            <TranslationSelect
                :value="defaultTextAttribute"
                solid
                regular
                required
                label="Default label attribute"
                :options="textAttributesOptions"
                @input="setDefaultTextAttribute" />
            <TranslationSelect
                :value="defaultImageAttribute"
                solid
                regular
                clearable
                label="Default image attribute"
                :options="imageAttributesOptions"
                @input="setDefaultImageAttribute" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '@Core/mixins/validations/errorValidationMixin';

export default {
    name: 'TemplateDesignerForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        TranslationSelect: () => import('@Core/components/Inputs/Select/TranslationSelect'),
        UploadImage: () => import('@Core/components/Inputs/Image/UploadImage'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('templateDesigner', {
            templateTitle: state => state.title,
            templateImage: state => state.image,
            defaultTextAttribute: state => state.defaultTextAttribute,
            defaultImageAttribute: state => state.defaultImageAttribute,
            textAttributesOptions: state => state.textAttributesOptions,
            imageAttributesOptions: state => state.imageAttributesOptions,
        }),
        isDisabled() {
            return Boolean(this.templateTitle);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['TEMPLATE_DESIGNER_UPDATE']))
                || (!this.isDisabled && !this.$hasAccess(['TEMPLATE_DESIGNER_CREATE']));
        },
        errorNameMessage() {
            const typeIndex = 'name';
            return this.elementIsValidate(typeIndex);
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'setTitle',
            'setImage',
            'setDefaultImageAttribute',
            'setDefaultTextAttribute',
        ]),
    },
};
</script>
