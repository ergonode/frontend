/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <section class="form-section">
        <legend
            v-if="title"
            class="form-section__title"
            v-text="title" />
        <fieldset class="form-section__fields">
            <slot />
        </fieldset>
    </section>
</template>

<script>
export default {
    name: 'FormSection',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .form-section {
        display: grid;
        grid-auto-flow: row;
        grid-row-gap: 16px;

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_14_20;
        }

        &__fields {
            display: contents;
        }
    }
</style>
