/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
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
                @upload="uploadValue"
                @remove="uploadValue" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'TemplateDesignerBaseCard',
    components: {
        Form: () => import('~/core/components/Form/Form'),
        FormGroup: () => import('~/core/components/Form/FormGroup'),
        TextField: () => import('~/core/components/Inputs/TextField'),
        UploadImage: () => import('~/core/components/Inputs/Image/UploadImage'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('templateDesigner', {
            templateTitle: (state) => state.title,
            templateImage: (state) => state.image,
        }),
        isDisabledByPrivileges() {
            const isEdit = /edit/.test(this.$route.path);
            return (isEdit && !this.$hasAccess(['TEMPLATE_DESIGNER_UPDATE']))
            || (!isEdit && !this.$hasAccess(['TEMPLATE_DESIGNER_CREATE']));
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
