/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <ProductStatusTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :language-code="languageCode" />
        </template>
        <template #saveButton>
            <Button
                title="SAVE CHANGES"
                :floating="{ bottom: '24px', right: '24px' }"
                @click.native="onSubmit">
                <template
                    v-if="isSubmitting"
                    #prepend="{ color }">
                    <IconSpinner :fill-color="color" />
                </template>
            </Button>
        </template>
    </TranslationsTab>
</template>

<script>
import Button from '@Core/components/Button/Button';
import TranslationsTab from '@Core/components/Card/Tabs/TranslationsTab';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import ProductStatusTranslationForm from '@Statuses/components/Form/ProductStatusTranslationForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ProductStatusTranslationsTab',
    components: {
        TranslationsTab,
        ProductStatusTranslationForm,
        Button,
        IconSpinner,
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('productStatus', [
            'updateProductStatus',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeErrors();
            this.updateProductStatus({
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Product status translations updated',
            });

            this.isSubmitting = false;
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
