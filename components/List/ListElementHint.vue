/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="element-hint font--medium-12-16"
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
        letter-spacing: 0.5px;
    }
</style>
