/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="grid-footer-text"
        v-text="props.title" />
</template>

<script>
export default {
    name: 'GridFooterText',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: [
                String,
                Number,
            ],
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-footer-text {
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
    }
</style>
