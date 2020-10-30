/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #header>
            <header class="login-header">
                <slot name="header" />
            </header>
        </template>
        <template #body>
            <FormSection>
                <slot name="body" />
            </FormSection>
        </template>
        <template #submit>
            <slot name="submitForm" />
        </template>
        <template #procced>
            <slot name="proceedForm" />
        </template>
    </Form>
</template>

<script>
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';

export default {
    name: 'LoginForm',
    components: {
        Form,
        FormSection,
    },
    mixins: [
        formActionsMixin,
    ],
    props: {
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style lang="scss" scoped>
    .form {
        z-index: $Z_INDEX_LVL_1;
        grid-template-columns: 280px !important;
        padding: 48px !important;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
    }

    .login-header {
        display: flex;
        align-items: center;
    }
</style>
