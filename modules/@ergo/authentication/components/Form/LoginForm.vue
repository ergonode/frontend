/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <template #header>
            <header class="login-header">
                <slot name="header" />
            </header>
        </template>
        <template #body>
            <FormSection>
                <slot name="body" />
            </FormSection>
            <footer>
                <slot name="footer" />
            </footer>
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/FormSection';

export default {
    name: 'LoginForm',
    components: {
        Form,
        FormSection,
    },
};
</script>

<style lang="scss" scoped>
    .form {
        z-index: $Z_INDEX_LVL_1;
        grid-template-columns: 280px;
        padding: 48px;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
    }

    .login-header {
        display: flex;
        align-items: center;
    }
</style>
