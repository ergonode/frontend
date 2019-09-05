/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-item">
        segment {{ itemName }}
    </div>
</template>
<script>

export default {
    name: 'ConditionSetItem',
    props: {
        itemName: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-item {
        z-index: 5;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        grid-column: 1 / 3;
        height: 100%;
        border: 1px solid $grey;
        background-color: $background;
        overflow: hidden;

        &__icon {
            flex: 0 0 auto;
            margin-left: 12px;
        }

        &__title {
            flex: 0 0 auto;
            margin: 0 8px;
        }

        &__categories-length {
            flex: 0 1 auto;
            border: 1px solid $grey;
            padding: 2px 8px;
            border-radius: 12px;
        }
    }
</style>
