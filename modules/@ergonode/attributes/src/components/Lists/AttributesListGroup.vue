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

export default {
    name: 'AttributesListGroup',
    components: {
        ListGroupElement: () => import('@Core/components/List/ListGroupElement'),
        AttributesListElement: () => import('@Attributes/components/Lists/AttributesListElement'),
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
