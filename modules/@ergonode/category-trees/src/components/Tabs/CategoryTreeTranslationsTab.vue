/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <template #default="{ languageCodes }">
            <CategoryTreeTranslationForm
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
import Button from '@Core/components/Button/Button';
import TranslationsTab from '@Core/components/Card/Tabs/TranslationsTab';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import CategoryTreeTranslationForm from '@Trees/components/Forms/CategoryTreeTranslationForm';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CategoryTreeTranslationsTab',
    components: {
        TranslationsTab,
        CategoryTreeTranslationForm,
        Button,
        IconSpinner,
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('validations', {
            errors: state => state.errors.categoryTreeTranslationsTab,
        }),
    },
    methods: {
        ...mapActions('categoryTree', [
            'updateCategoryTree',
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
            this.updateCategoryTree({
                scope: 'categoryTreeTranslationsTab',
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Category tree translations updated',
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
