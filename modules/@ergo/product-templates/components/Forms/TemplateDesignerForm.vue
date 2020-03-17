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
                @input="(title) => setTemplateDesignerTitle(title)" />
            <UploadImage
                :value="templateImage"
                label="Template cover image"
                :disabled="isDisabledByPrivileges"
                border
                @upload="uploadValue"
                @remove="uploadValue" />
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
        UploadImage: () => import('@Core/components/Inputs/Image/UploadImage'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('templateDesigner', {
            templateTitle: state => state.title,
            templateImage: state => state.image,
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
            'setTemplateDesignerTitle',
            'setTemplateDesignerImage',
        ]),
        uploadValue(value = '') {
            this.setTemplateDesignerImage(value);
        },
    },
};
</script>
