/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <fieldset class="form-group">
        <legend
            v-if="title"
            class="form-group__title"
            v-text="title" />
        <slot />
    </fieldset>
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
        display: contents;

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_16_24;
        }
    }
</style>
