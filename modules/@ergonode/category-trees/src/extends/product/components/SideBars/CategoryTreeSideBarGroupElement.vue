/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListGroupElement
        :title="group.name"
        :subtitle="itemsCountDescription"
        :hint="group.hint"
        :is-expanded="group.expanded"
        :is-prefetching-data="isPrefetchingData" />
</template>

<script>

export default {
    name: 'CategoryTreeSideBarGroupElement',
    props: {
        group: {
            type: Object,
            required: true,
        },
        isPrefetchingData: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        itemsCountDescription() {
            return `${this.group.itemsCount} ${this.$t('@Trees.productExtend.components.CategoryTreeSideBarGroupElement.groupSubtitle')}`;
        },
    },
};
</script>
