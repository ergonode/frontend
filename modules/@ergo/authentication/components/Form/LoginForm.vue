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
        <FormGroup>
            <slot name="body" />
        </FormGroup>
        <footer>
            <slot name="footer" />
        </footer>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormGroup from '@Core/components/Form/FormGroup';

export default {
    name: 'LoginForm',
    components: {
        Form,
        FormGroup,
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
