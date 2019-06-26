/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard>
        <TextField
            :value="templateTitle"
            solid
            required
            regular
            :error-messages="errorNameMessage"
            label="Template name"
            @input="(title) => setTemplateDesignerTitle({ title })" />
        <UploadImage
            :value="templateImage"
            style="height: 180px;"
            title="Template cover image"
            @upload="uploadValue"
            @remove="uploadValue" />
    </BaseCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BaseCard from '~/components/Card/BaseCard';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'TemplateDesignerBaseCard',
    components: {
        BaseCard,
        TextField: () => import('~/components/Inputs/TextField'),
        UploadImage: () => import('~/components/Inputs/Image/UploadImage'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('templateDesigner', {
            templateTitle: state => state.title,
            templateImage: state => state.image,
        }),
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
            this.setTemplateDesignerImage({ image: value });
        },
    },
};
</script>
