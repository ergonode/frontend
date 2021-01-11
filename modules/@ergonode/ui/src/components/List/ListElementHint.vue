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
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         *  The hint is a tip for the component
         */
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
    }
</style>
