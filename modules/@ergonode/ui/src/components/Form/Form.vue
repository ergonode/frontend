/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FeedbackProvider
        :errors="errors"
        :change-values="changeValues">
        <template #default="{ hasError, hasValueToSave }">
            <form
                class="form"
                data-cy="form"
                :style="styles"
                @submit.prevent="onSubmit">
                <slot name="header">
                    <h2
                        v-if="title"
                        class="form__title"
                        v-text="title" />
                </slot>
                <template v-if="hasError">
                    <section
                        class="form__errors"
                        data-cy="form-errors">
                        <IconError :fill-color="redColor" />
                        <div class="errors-list">
                            <h3 class="errors-list__header">
                                Please review errors below
                            </h3>
                            <LinkButton
                                v-for="(error, index) in presentationErrors"
                                :title="error"
                                :key="index" />
                        </div>
                    </section>
                    <Divider />
                </template>
                <slot
                    name="body"
                    :presentation-errors="presentationErrors" />
                <div
                    class="form__footer"
                    v-if="isFooterVisible">
                    <slot name="submit">
                        <Button
                            v-if="isSubmitButtonVisible"
                            data-cy="submit"
                            :title="submitTitle"
                            :disabled="disabled"
                            type="submit">
                            <template #append="{ color }">
                                <IconSpinner
                                    v-if="isSubmitting"
                                    :fill-color="color" />
                                <IconSync
                                    v-else-if="hasValueToSave"
                                    :fill-color="color" />
                            </template>
                        </Button>
                    </slot>
                    <slot name="proceed">
                        <Button
                            v-if="isProceedButtonVisible"
                            data-cy="proceed"
                            :title="proceedTitle"
                            :disabled="disabled"
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
    </FeedbackProvider>
</template>

<script>
import {
    THEME,
} from '@Core/defaults/theme';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import {
    RED,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'Form',
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
         * Component width
         */
        width: {
            type: [
                Number,
                String,
            ],
            default: 352,
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Values that have been changes at given context
         */
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The parsing validation errors function for custom presentation format
         */
        errorsPresentationMapper: {
            type: Function,
            default: null,
        },
    },
    computed: {
        styles() {
            return {
                gridTemplateColumns: `${this.width}px`,
            };
        },
        secondaryTheme() {
            return THEME.SECONDARY;
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
    },
};
</script>

<style lang="scss" scoped>
    .form {
        display: grid;
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
        }
    }
</style>
