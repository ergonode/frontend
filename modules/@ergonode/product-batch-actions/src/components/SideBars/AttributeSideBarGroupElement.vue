/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListGroupElement
        :title="group.value"
        :subtitle="itemsCountDescription"
        :hint="group.hint"
        :is-expanded="group.expanded" />
</template>

<script>

export default {
    name: 'AttributeSideBarGroupElement',
    props: {
        group: {
            type: Object,
            required: true,
        },
    },
    computed: {
        itemsCountDescription() {
            return `${this.group.itemsCount} ${this.$t('@ProductBatchActions.productBatchAction._.title')}`;
        },
    },
};
</script>
