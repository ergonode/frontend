/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div
        :class=" [
            'form-subsection',
            {
                'form-subsection--required': props.required,
            },
        ]">
        <span
            v-if="props.title"
            class="form-subsection__title"
            v-text="props.title" />
        <slot />
    </div>
</template>

<script>
export default {
    name: 'FormSubsection',
    props: {
        title: {
            type: String,
            default: '',
        },
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

            &::after {
                color: $RED;
                content: "*";
            }
        }

        &--required {
            #{$subsection}__title::after {
                color: $RED;
                content: "*";
            }
        }
    }
</style>
