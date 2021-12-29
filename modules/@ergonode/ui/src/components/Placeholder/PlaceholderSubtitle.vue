/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="placeholder-subtitle"
        v-text="title" />
</template>

<script>

export default {
    name: 'PlaceholderSubtitle',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: 'There are no records in the system.',
        },
    },
};
</script>

<style lang="scss" scoped>
    .placeholder-subtitle {
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_14_20;
    }
</style>
