/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div class="presentation-cell">
        <span
            :title="props.value"
            v-text="props.value" />
        <span
            v-if="props.value && props.suffix"
            :title="props.suffix"
            v-text="props.suffix" />
    </div>
</template>

<script>

export default {
    name: 'GridPresentationCell',
    props: {
        value: {
            type: [String, Number],
            required: true,
        },
        suffix: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .presentation-cell {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        width: 0;
        padding: 8px;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
