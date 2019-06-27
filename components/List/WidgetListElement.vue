/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListElement
        v-draggable-element="{
            id: draggableListID,
            draggedElementStyle,
            onDraggedState,
        }"
        :dragged="isDragged">
        <ListElementIcon :icon="iconByType" />
        <ListElementDescription
            :title="item.type"
            :subtitle="item.label" />
    </ListElement>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DraggableStates from '~/model/draggableStates';

export default {
    name: 'AttributeListElement',
    components: {
        ListElement: () => import('~/components/List/ListElement'),
        ListElementIcon: () => import('~/components/List/ListElementIcon'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isDragged: false,
            draggedElementStyle: { width: 246, height: 32, backgroundColor: '#fff' },
            draggableListID: this.item.type,
        };
    },
    computed: {
        ...mapGetters('list', [
            'isElementDisabled',
        ]),
        iconByType() {
            // TODO: waiting for an ICON
            return '';
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
