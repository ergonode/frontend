/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="typo-btn--xs txt--dark-graphite info-cell"
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

<style lang="scss">
    .info-cell {
        flex: 1;
        width: 0;
        padding: 8px;
        user-select: none;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
