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
import {
    mapActions,
    mapState,
} from 'vuex';

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
        title: {
            type: String,
            default: '',
        },
        fieldsKeys: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        ...mapState('validations', {
            errors: state => state.errors,
        }),
        isFooterVisible() {
            return !!(this.$slots.submit || this.$slots.proceed)
                || this.isSubmitButtonVisible
                || this.isProceedButtonVisible;
        },
        isSubmitButtonVisible() {
            return this.submitTitle !== '';
        },
        isProceedButtonVisible() {
            return this.submitTitle !== '';
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        errorMessages() {
            return this.fieldsKeys.reduce((acc, current) => {
                const errors = acc;
                const error = this.getErrorForKey(current);

                if (error) {
                    errors[current] = error;
                }

                return errors;
            }, {});
        },
        formGlobalError() {
            return this.getErrorForKey('form');
        },
        hasAnyError() {
            return Object.values(this.errorMessages).length > 0 || this.formGlobalError;
        },
        redColor() {
            return RED;
        },
    },
    beforeDestroy() {
        this.removeErrors();
    },
    methods: {
        ...mapActions('validations', [
            'removeErrors',
        ]),
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
