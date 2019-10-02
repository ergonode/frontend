/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="ghost-column">
        <div class="container">
            <IconAddColumn fill-color="#fff" />
            <span class="ghost-column__title">ADD COLUMN</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GridGhostColumn',
    components: {
        IconAddColumn: () => import('~/components/Icon/Actions/IconAddColumn'),
    },
};
</script>

<style lang="scss" scoped>
    .ghost-column {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $primary;
        box-shadow:
            inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
            inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
            inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);

        &__title {
            @include setFont(bold, small, regular, $white);

            margin-top: 8px;
        }
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
