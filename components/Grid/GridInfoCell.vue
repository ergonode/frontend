/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="info-cell font--medium-s-1"
        v-text="props.value" />
</template>

<script>

export default {
    name: 'GridInfoCell',
    props: {
        value: {
            type: [String, Number],
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .info-cell {
        display: flex;
        flex: 1;
        align-items: center;
        width: 0;
        padding: 8px;
        color: $GRAPHITE_DARK;
        user-select: none;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
