/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="badge">
        <slot name="prepend" />
        <span
            class="badge__title"
            v-text="title" />
    </div>
</template>

<script>
export default {
    name: 'InformationBadge',
    props: {
        title: {
            type: [String, Number],
            default: 'Title',
        },
    },
};
</script>

<style lang="scss" scoped>
    .badge {
        display: flex;
        border-radius: 4px;
        height: 16px;
        padding: 4px 8px;
        background-color: $information;

        &__title {
            @include setFont(semiBold, tiny, regular, $white);
        }
    }
</style>
