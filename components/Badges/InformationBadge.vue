/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="badge">
        <slot name="prepend" />
        <span
            class="badge__title font--semi-bold-xs-1"
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
        height: 24px;
        padding: 4px 8px 4px 0;
        background-color: $BLUE;

        & > svg {
            margin: -4px 0 0 -7px;
        }

        &__title {
            color: $WHITE;
            text-transform: uppercase;
        }
    }
</style>
