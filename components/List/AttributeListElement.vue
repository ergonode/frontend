/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListElement
        :key="item.id"
        v-draggable-element="{
            id: draggableListID,
            draggedElementStyle,
            onDraggedState,
        }"
        :dragged="isDragged"
        :disabled="isElementDisabled(item.id, languageCode)">
        <ListElementIcon :icon="iconByType" />
        <ListElementDescription
            :title="item.type"
            :subtitle="item.label || item.code" />
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
        languageCode: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isDragged: false,
            draggedElementStyle: { width: 246, height: 32, backgroundColor: '#fff' },
            draggableListID: `${this.item.code}:${this.languageCode}`,
        };
    },
    computed: {
        ...mapGetters('list', [
            'isElementDisabled',
        ]),
        iconByType() {
            if (!this.item.type) return '';

            const convertedType = this.item.type.toLowerCase().replace('_', '-');

            return `attribute-${convertedType}`;
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
