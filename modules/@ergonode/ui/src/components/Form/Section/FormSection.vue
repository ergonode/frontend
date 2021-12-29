/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <section class="form-section">
        <legend
            v-if="title"
            class="form-section__title"
            v-text="title" />
        <fieldset :style="fieldsetStyle">
            <slot />
        </fieldset>
    </section>
</template>

<script>
export default {
    name: 'FormSection',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * Number of columns in section
         */
        columns: {
            type: Number,
            default: 1,
        },
    },
    computed: {
        fieldsetStyle() {
            return {
                display: 'grid',
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gap: '24px 16px',
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .form-section {
        display: grid;
        grid-auto-flow: row;
        grid-template-columns: inherit;
        grid-row-gap: 24px;

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_14_20;
        }
    }
</style>
