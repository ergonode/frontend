/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="element-description">
        <div class="description__left">
            <slot name="elementsOnLeft" />
        </div>
        <div class="description__right">
            <slot name="elementsOnRight" />
        </div>
    </div>
</template>

<script>

export default {
    name: 'ListElementDescription',
};
</script>

<style lang="scss" scoped>
    .element-description {
        display: flex;
        flex: 1;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        .description__left {
            display: flex;
            flex: 1;
            flex-wrap: wrap;
            overflow: hidden;
        }
    }
</style>
