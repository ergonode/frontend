/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="font--semi-bold-10-12"
        v-text="label" />
</template>

<script>
export default {
    name: 'BadgeLabel',
    props: {
        label: {
            type: [String, Number],
            default: 'Label',
        },
    },
};
</script>

<style lang="scss" scoped>
    span {
        text-transform: uppercase;
    }
</style>
