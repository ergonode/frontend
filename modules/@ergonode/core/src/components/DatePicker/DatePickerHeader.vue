/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="header"
        v-text="props.title" />
</template>

<script>
export default {
    name: 'DatePickerHeader',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        color: $GRAPHITE;
        font: $FONT_MEDIUM_12_16;
    }
</style>
