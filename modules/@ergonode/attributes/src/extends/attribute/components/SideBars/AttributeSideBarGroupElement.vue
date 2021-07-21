/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListGroupElement
        :title="group.value"
        :subtitle="itemsCountDescription"
        :hint="group.hint"
        :is-expanded="group.expanded"
        :is-prefetching-data="isPrefetchingData" />
</template>

<script>

export default {
    name: 'AttributeSideBarGroupElement',
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
            return `${this.group.itemsCount} ${this.$t('@Attributes.attribute._.title')}`;
        },
    },
};
</script>
