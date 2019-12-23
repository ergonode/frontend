/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="presentation-cell"
        v-text="props.value" />
</template>

<script>

export default {
    name: 'GridPresentationCell',
    props: {
        value: {
            type: [String, Number],
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .presentation-cell {
        flex: 1;
        width: 0;
        padding: 8px;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
        user-select: none;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
