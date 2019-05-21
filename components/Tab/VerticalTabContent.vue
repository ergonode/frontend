/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <KeepAlive>
        <Component
            :is="tabItem.component"
            v-bind="tabItem.props" />
    </KeepAlive>
</template>

<script>
export default {
    name: 'VerticalTabContent',
    props: {
        tabItem: {
            type: Object,
            required: true,
        },
    },
};
</script>
