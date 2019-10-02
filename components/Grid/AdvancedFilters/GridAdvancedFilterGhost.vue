/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="advanced-filters-ghost">
        <div class="container">
            <IconAddFilter fill-color="#fff" />
            <span class="advanced-filters-ghost__title">
                ADD FILTER
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GridAdvancedFilterGhost',
    components: {
        IconAddFilter: () => import('~/components/Icon/Actions/IconAddFilter'),
    },
};
</script>

<style lang="scss" scoped>
    .advanced-filters-ghost {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        padding: 0 12px;
        background-color: $primary;
        box-shadow:
            inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
            inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
            inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);

        &__title {
            @include setFont(bold, small, regular, $white);

            margin-left: 8px;
        }
    }

    .container {
        display: flex;
        align-items: center;
    }
</style>
