/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <KeepAlive>
        <Component
            :is="tabItem.component"
            v-bind="tabItem.props"
            :is-expanded="isExpanded"
            @expand="onExpand" />
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
        isExpanded: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        onExpand(isExpanded) {
            this.$emit('expand', isExpanded);
        },
    },
};
</script>
