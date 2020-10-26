/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListGroupElement
        :title="group.value"
        :subtitle="itemsCountDescription"
        :hint="group.hint"
        :is-expanded="isExpanded"
        :is-prefetching-data="isPrefetchingData"
        @expand="onGroupExpand">
        <template #item>
            <AttributesListElement
                v-for="item in items"
                :key="item.id"
                :item="item"
                :is-draggable="isDraggable"
                :language-code="languageCode" />
        </template>
    </ListGroupElement>
</template>

<script>
import AttributesListElement from '@Attributes/components/Lists/AttributesListElement';
import ListGroupElement from '@Core/components/List/ListGroupElement';

export default {
    name: 'AttributesListGroup',
    components: {
        ListGroupElement,
        AttributesListElement,
    },
    props: {
        group: {
            type: Object,
            required: true,
        },
        items: {
            type: Array,
            default: () => [],
        },
        itemsCount: {
            type: Number,
            default: 0,
        },
        languageCode: {
            type: String,
            required: true,
        },
        isExpanded: {
            type: Boolean,
            default: false,
        },
        isDraggable: {
            type: Boolean,
            default: true,
        },
        isPrefetchingData: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        itemsCountDescription() {
            return `${this.itemsCount} ${this.$t('attribute.page.title')}`;
        },
    },
    methods: {
        onGroupExpand(payload) {
            this.$emit('expand', {
                ...payload,
                group: this.group,
                languageCode: this.languageCode,
            });
        },
    },
};
</script>
