/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="item.id"
        :is-draggable="$hasAccess(['CATEGORY_TREE_UPDATE'])"
        :is-disabled="disabledElements[languageCode] && disabledElements[languageCode][item.id]"
        @drag="onDrag">
        <ListElementDescription>
            <ListElementTitle
                :title="item.name || `#${item.code}`"
                :hint="item.name ? `#${item.code} ${languageCode}`: ''" />
            <ListElementHint :title="productsCount" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'CategoriesListElement',
    components: {
        ListDraggableElement: () => import('@Core/components/List/ListDraggableElement'),
        ListElementDescription: () => import('@Core/components/List/ListElementDescription'),
        ListElementTitle: () => import('@Core/components/List/ListElementTitle'),
        ListElementHint: () => import('@Core/components/List/ListElementHint'),
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
        languageCode: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState('list', {
            disabledElements: (state) => state.disabledElements,
        }),
        productsCount() {
            return `${this.item.elements_count || 0} Product${this.item.elements_count === 1 ? '' : 's'}`;
        },
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggedElement',
            'setDraggableState',
        ]),
        onDrag(isDragged) {
            if (isDragged) {
                const { id, code, name } = this.item;
                this.setDraggedElement({ id, code, name });
            } else {
                this.setDraggedElement();
            }

            this.setDraggableState({ propName: 'isListElementDragging', value: isDragged });
        },
    },
};
</script>
