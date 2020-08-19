/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <TemplateDesignerForm @submit="onSubmit">
                <template #submitForm>
                    <Button
                        title="SAVE CHANGES"
                        type="submit">
                        <template
                            v-if="isSubmittingForm"
                            #append="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </TemplateDesignerForm>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import Button from '@Core/components/Button/Button';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import TemplateDesignerForm from '@Templates/components/Forms/TemplateDesignerForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ProductTemplateGeneralTab',
    components: {
        Button,
        IconSpinner,
        TemplateDesignerForm,
        ResponsiveCenteredViewTemplate,
    },
    data() {
        return {
            isSubmittingForm: false,
        };
    },
    methods: {
        ...mapActions('productTemplate', [
            'updateProductTemplate',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        async onSubmit() {
            if (this.isSubmittingForm) {
                return;
            }
            this.isSubmittingForm = true;

            try {
                this.removeValidationErrors();
                await this.updateProductTemplate();
            } catch (e) {
                if (e.data) {
                    this.onError(e.data);
                }
            } finally {
                this.isSubmittingForm = false;
            }
        },
    },
};
</script>
