/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="element-hint font--semi-bold-10-12"
        v-text="props.title" />
</template>

<script>
export default {
    name: 'ListElementHint',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .element-hint {
        color: $GRAPHITE;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
