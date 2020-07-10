/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="list-element-hint"
        :title="hint"
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
        hint: {
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
    .list-element-hint {
        color: $GRAPHITE;
        font: $FONT_SEMI_BOLD_10_12;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
