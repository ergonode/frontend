/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="card-header">
        <span
            class="font--medium-xl-4"
            v-text="title" />
    </div>
</template>

<script>
export default {
    name: 'BaseCardHeader',
    props: {
        title: {
            type: String,
            default: 'Header',
        },
    },
};
</script>

<style lang="scss" scoped>
    .card-header {
        padding: 16px 24px;
        color: $GRAPHITE_DARK;
    }
</style>
