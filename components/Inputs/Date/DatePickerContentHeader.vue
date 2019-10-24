/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
            @include setFont(semiBold, tiny, regular, $GRAPHITE);

            display: flex;
            justify-content: center;
            align-items: center;
            flex-basis: 32px;
            height: 32px;
        }
    }
</style>
