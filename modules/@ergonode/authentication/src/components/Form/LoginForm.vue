/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form @submit="onSubmit">
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
        <template #cancel>
            <slot name="cancelForm" />
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';

export default {
    name: 'LoginForm',
    components: {
        Form,
        FormSection,
    },
    methods: {
        onSubmit() {
            this.$emit('submit');
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
