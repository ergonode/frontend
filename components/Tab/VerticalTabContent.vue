/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <KeepAlive>
        <Component
            :is="tabItem.component"
            class="tab-content"
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

<style lang="scss" scoped>
    .tab-content {
        border-top: $BORDER_1_GREY;
        border-left: $BORDER_1_GREY;
        border-right: $BORDER_1_GREY;
        box-sizing: border-box;
    }
</style>
