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
            draggable: $hasAccess('SEGMENT_UPDATE'),
        }"
        :dragged="isDragged">
        <ListElementDescription
            :title="item.name"
            subtitle="Short description"
            title-typo="typo-subtitle"
            title-color="txt--dark-graphite"
            subtitle-typo="typo-hint"
            subtitle-color="txt--light-graphite" />
    </ListElement>
</template>

<script>
import { mapActions } from 'vuex';
import { getUUID } from '~/model/stringWrapper';
import DraggableStates from '~/model/draggableStates';

export default {
    name: 'ConditionsListElement',
    components: {
        ListElement: () => import('~/components/List/ListElement'),
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
        };
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggedElement',
            'setDraggableState',
        ]),
        onDraggedState(event) {
            const uniqId = `${event.target.id}--${getUUID()}`;
            switch (event.detail.state) {
            case DraggableStates.START:
                this.isDragged = true;
                this.setDraggedElement(uniqId);
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
