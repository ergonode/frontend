/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InformationBadge v-bind="$attrs">
        <template #prepend>
            <slot name="icon" />
        </template>
    </InformationBadge>
</template>

<script>
import InformationBadge from '@Core/components/Badges/InformationBadge';

export default {
    name: 'InformationIconBadge',
    inheritAttrs: false,
    components: {
        InformationBadge,
    },
};
</script>

<style lang="scss" scoped>
    .badge {
        padding-left: 0 !important;
    }
</style>
