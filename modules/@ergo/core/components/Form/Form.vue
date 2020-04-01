/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <form
        class="form"
        @submit.prevent>
        <slot name="header">
            <h2
                v-if="title"
                class="form__title"
                v-text="title" />
        </slot>
        <template v-if="hasAnyError">
            <section class="form__errors">
                <IconError />
                <div class="errors-list">
                    <h3 class="errors-list__header">
                        Please review errors bellow
                    </h3>
                    <div class="errors-list__links">
                        <LinkButton
                            v-if="formGlobalError"
                            :title="formGlobalError" />
                        <LinkButton
                            v-for="(error, index) in errorMessages"
                            :title="error"
                            :key="index" />
                    </div>
                </div>
            </section>
            <Divider />
        </template>
        <slot
            name="body"
            :error-messages="errorMessages" />
    </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Form',
    components: {
        LinkButton: () => import('@Core/components/Buttons/LinkButton'),
        IconError: () => import('@Core/components/Icons/Feedback/IconError'),
        Divider: () => import('@Core/components/Dividers/Divider'),
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        // TODO:
        // When we create dynamic form generator it will be replaced by *scheme*
        fieldsKeys: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        ...mapState('validations', {
            validationErrors: state => state.validationErrors,
        }),
        errorMessages() {
            return this.fieldsKeys.reduce((acc, current) => {
                const errors = acc;
                const error = this.getValidationErrorForKey(current);

                if (error) {
                    errors[current] = error;
                }

                return errors;
            }, {});
        },
        formGlobalError() {
            return this.getValidationErrorForKey('form');
        },
        hasAnyError() {
            return Object.values(this.errorMessages).length > 0 || this.formGlobalError;
        },
    },
    destroyed() {
        this.removeValidationErrors();
    },
    methods: {
        ...mapActions('validations', [
            'removeValidationErrors',
        ]),
        getValidationErrorForKey(key) {
            return this.validationErrors[key] || null;
        },
    },
};
</script>

<style lang="scss" scoped>
    .form {
        display: grid;
        grid-template-columns: 352px;
        grid-auto-flow: row;
        grid-row-gap: 24px;
        padding: 24px;

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_16_24;
        }

        &__errors {
            display: grid;
            grid-template-columns: max-content;
            grid-auto-flow: column;
            grid-column-gap: 16px;
            border: $BORDER_2_RED;
            padding: 16px;
            box-sizing: border-box;
        }

        .errors-list {
            display: grid;
            grid-auto-flow: row;
            grid-row-gap: 8px;
            overflow: auto;

            &__header {
                color: $GRAPHITE_DARK;
                font: $FONT_SEMI_BOLD_14_20;
            }

            &__links {
                display: contents;
            }
        }
    }
</style>
