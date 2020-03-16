/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <section class="form-group">
        <h3
            v-if="title"
            class="form-group__title"
            v-text="title" />
        <div class="form-group__fields">
            <slot />
        </div>
    </section>
</template>

<script>
export default {
    name: 'FormGroup',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .form-group {
        display: grid;
        grid-template-columns: 352px;
        grid-auto-flow: row;
        grid-row-gap: 24px;

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;
        }

        &__fields {
            display: grid;
            grid-template-columns: 352px;
            grid-auto-flow: row;
            grid-row-gap: 16px;
        }
    }
</style>
