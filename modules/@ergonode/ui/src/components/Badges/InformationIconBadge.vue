/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InformationBadge v-bind="$attrs">
        <template #prepend>
            <!--
                @slot icon element
                @binding {string} color color of an element
            -->
            <slot
                name="icon"
                :color="$attrs.color" />
        </template>
    </InformationBadge>
</template>

<script>

export default {
    name: 'InformationIconBadge',
    inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
    .badge {
        padding-left: 0 !important;
    }
</style>
