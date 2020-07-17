/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="grid-suffix-presentation-cell"
        v-text="props.suffix" />
</template>

<script>
export default {
    name: 'GridSuffixPresentationCell',
    props: {
        suffix: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-suffix-presentation-cell {
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
        margin: 0 6px;
    }
</style>
