/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class=" [
            'form-subsection',
            {
                'form-subsection--required': required,
            },
        ]">
        <span
            v-if="title"
            class="form-subsection__title"
            v-text="title" />
        <slot />
    </div>
</template>

<script>
export default {
    name: 'FormSubsection',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * Determines if the given component is required
         */
        required: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .form-subsection {
        $subsection: &;

        display: grid;
        grid-auto-flow: row;
        grid-row-gap: 16px;

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_14_20;
        }

        &--required {
            #{$subsection}__title::after {
                color: $RED;
                content: "*";
            }
        }
    }
</style>
