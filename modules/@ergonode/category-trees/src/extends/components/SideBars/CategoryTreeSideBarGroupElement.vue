/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
import ListGroupElement from '@UI/components/List/ListGroupElement';

export default {
    name: 'CategoryTreeSideBarGroupElement',
    components: {
        ListGroupElement,
    },
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
            return `${this.group.itemsCount} ${this.$t('categoryTree.sidebar.groupSubtitle')}`;
        },
    },
};
</script>
