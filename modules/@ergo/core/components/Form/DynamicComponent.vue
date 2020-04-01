/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        v-on="$listeners"
        v-bind="$attrs.props"
        :is="$attrs.component" />
</template>

<script>
export default {
    name: 'DynamicComponent',
    inheritAttrs: false,
};
</script>
