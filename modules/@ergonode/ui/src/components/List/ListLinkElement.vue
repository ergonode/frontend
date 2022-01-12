/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListElement v-bind="$attrs">
        <NuxtLink
            :to="$attrs.to"
            class="list-link-element">
            <slot />
        </NuxtLink>
    </ListElement>
</template>

<script>

export default {
    name: 'ListLinkElement',
    inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
    .list-link-element {
        display: flex;
        flex: 1;
        text-decoration: none;
        color: unset;

        &:hover {
            text-decoration: underline;
        }
    }
</style>
