/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="element-hint"
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
        @include setFont(medium, tiny, tiny, $graphite, 0.5);

        position: absolute;
        right: 6px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
