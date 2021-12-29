/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="content-header">
        <span
            v-for="header in headers"
            :key="header"
            class="header">
            {{ header }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'DatePickerContentHeader',
    props: {
        /**
         *
         */
        headers: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .content-header {
        display: flex;
        justify-content: center;
        align-items: center;

        .header {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-basis: 32px;
            height: 32px;
            color: $GRAPHITE;
            font: $FONT_SEMI_BOLD_10_12;
        }
    }
</style>
