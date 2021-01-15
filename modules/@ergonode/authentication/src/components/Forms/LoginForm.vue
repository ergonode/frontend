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
        :errors-presentation-mapper="errorMapper"
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
import {
    isObject,
} from '@Core/models/objectWrapper';
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
    methods: {
        errorMapper(errors) {
            return Object.keys(errors).reduce((acc, key) => {
                const tmpObject = acc;

                if (isObject(errors[key])) {
                    tmpObject[key] = Object.values(errors[key]).join(', ');
                } else {
                    tmpObject[key] = errors[key];
                }

                return tmpObject;
            }, {});
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
        display: grid;
        justify-content: flex-start;
        align-items: center;
        grid-auto-flow: column;
        grid-column-gap: 16px;
    }
</style>
