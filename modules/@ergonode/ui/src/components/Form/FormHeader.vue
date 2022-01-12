/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <h2
        class="form-header"
        v-text="title" />
</template>

<script>
export default {
    name: 'FormHeader',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .form-header {
        color: $GRAPHITE_DARK;
        font: $FONT_SEMI_BOLD_20_24;
    }
</style>
