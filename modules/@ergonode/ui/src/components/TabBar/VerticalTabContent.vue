/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <KeepAlive>
        <Component
            :is="item.component"
            v-bind="item.props" />
    </KeepAlive>
</template>

<script>
export default {
    name: 'VerticalTabContent',
    props: {
        /**
         * Item data model
         */
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>
