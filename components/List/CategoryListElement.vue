/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListElement
        :key="item.id"
        v-draggable-element="{
            id: item.id,
            draggedElementStyle,
            onDraggedState,
            draggable: $canIUse('CATEGORY_TREE_UPDATE'),
        }"
        :dragged="isDragged"
        :disabled="disabledElements[languageCode] && disabledElements[languageCode][item.id]">
        <ListElementDescription
            :title="item.name || item.code"
            :subtitle="productsCount"
            title-typo="typo-subtitle"
            title-color="txt--dark-graphite"
            subtitle-typo="typo-hint"
            subtitle-color="txt--light-graphite" />
    </ListElement>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DraggableStates from '~/model/draggableStates';

export default {
    name: 'CategoryListElement',
    components: {
        ListElement: () => import('~/components/List/ListElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
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
    data() {
        return {
            isDragged: false,
            draggedElementStyle: { width: 246, height: 32, backgroundColor: '#fff' },
        };
    },
    computed: {
        ...mapState('list', {
            disabledElements: state => state.disabledElements,
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
        onDraggedState(event) {
            switch (event.detail.state) {
            case DraggableStates.START:
                this.isDragged = true;
                this.setDraggedElement(event.target.id);
                break;
            case DraggableStates.END:
                this.isDragged = false;
                this.setDraggedElement();
                break;
            default: break;
            }

            this.setDraggableState({ propName: 'isListElementDragging', value: this.isDragged });
        },
    },
};
</script>
