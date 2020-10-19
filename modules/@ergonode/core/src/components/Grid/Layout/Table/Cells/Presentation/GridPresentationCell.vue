/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="grid-presentation-cell"
        v-text="props.value" />
</template>

<script>

export default {
    name: 'GridPresentationCell',
    props: {
        /**
         * Component value
         */
        value: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
    },
    mounted() {
        console.log(this.$el);
    },
};
</script>

<style lang="scss" scoped>
    .grid-presentation-cell {
        flex: 1;
        width: 0;
        padding: 8px 0 8px 8px;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
