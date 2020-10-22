/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <form
        class="form"
        @submit.prevent="onSubmit">
        <slot name="header">
            <h2
                v-if="title"
                class="form__title"
                v-text="title" />
        </slot>
        <template v-if="hasAnyError">
            <section class="form__errors">
                <IconError :fill-color="redColor" />
                <div class="errors-list">
                    <h3 class="errors-list__header">
                        Please review errors below
                    </h3>
                    <div class="errors-list__links">
                        <LinkButton
                            v-if="formGlobalError"
                            :title="formGlobalError" />
                        <LinkButton
                            v-for="(error, index) in presentationErrors"
                            :title="error"
                            :key="index" />
                    </div>
                </div>
            </section>
            <Divider />
        </template>
        <slot name="body" />
        <div
            class="form__footer"
            v-if="isFooterVisible">
            <slot name="submit">
                <Button
                    v-if="isSubmitButtonVisible"
                    data-cy="submit"
                    :title="submitTitle"
                    type="submit">
                    <template
                        v-if="isSubmitting"
                        #append="{ color }">
                        <IconSpinner :fill-color="color" />
                    </template>
                </Button>
            </slot>
            <slot name="proceed">
                <Button
                    v-if="isProceedButtonVisible"
                    data-cy="proceed"
                    :title="proceedTitle"
                    :theme="secondaryTheme"
                    @click.native="onProceed">
                    <template
                        v-if="isProceeding"
                        #prepend="{ color }">
                        <IconSpinner :fill-color="color" />
                    </template>
                </Button>
            </slot>
        </div>
    </form>
</template>

<script>
import {
    RED,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Button from '@Core/components/Button/Button';
import Divider from '@Core/components/Dividers/Divider';
import IconError from '@Core/components/Icons/Feedback/IconError';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import LinkButton from '@Core/components/LinkButton/LinkButton';
import {
    THEME,
} from '@Core/defaults/theme';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';

export default {
    name: 'Form',
    components: {
        Button,
        LinkButton,
        IconError,
        Divider,
        IconSpinner,
    },
    mixins: [
        formActionsMixin,
    ],
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The function which is parsing validation errors to custom presentation format
         */
        errorsPresentationMapper: {
            type: Function,
            default: null,
        },
    },
    computed: {
        isFooterVisible() {
            return !!(this.$slots.submit || this.$slots.proceed)
                || this.isSubmitButtonVisible
                || this.isProceedButtonVisible;
        },
        isSubmitButtonVisible() {
            return this.submitTitle !== '';
        },
        isProceedButtonVisible() {
            return this.proceedTitle !== '';
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        formGlobalError() {
            return this.getErrorForKey('__form');
        },
        hasAnyError() {
            return Object.values(this.errors).length > 0 || this.formGlobalError;
        },
        redColor() {
            return RED;
        },
        presentationErrors() {
            if (!this.errorsPresentationMapper) {
                return this.errors;
            }

            return this.errorsPresentationMapper(this.errors);
        },
    },
    methods: {
        getErrorForKey(key) {
            return this.errors[key] || null;
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

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_16_24;
        }

        &__subtitle {
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_14_20;
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

        &__footer {
            display: flex;
            justify-content: space-between;
        }

        .errors-list {
            display: grid;
            grid-auto-flow: row;
            grid-row-gap: 8px;

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
