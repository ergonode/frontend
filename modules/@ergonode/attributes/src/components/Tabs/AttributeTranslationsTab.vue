/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <AttributeTranslationForm
                v-for="languageCode in languageCodes"
                :key="languageCode"
                :errors="errors"
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
import AttributeTranslationForm from '@Attributes/components/Forms/AttributeTranslationForm';
import Button from '@Core/components/Button/Button';
import TranslationsTab from '@Core/components/Card/Tabs/TranslationsTab';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AttributeTranslationsTab',
    components: {
        TranslationsTab,
        AttributeTranslationForm,
        Button,
        IconSpinner,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('attribute', [
            'updateAttribute',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeScopeErrors',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateAttribute({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Attribute translations updated',
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
