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
        :disabled="isElementDisabled(draggableListID, languageCode)">
        <ListElementDescription
            :title="item.code"
            subtitle="? Products"
            title-typo="typo-subtitle"
            title-color="txt--dark-graphite"
            subtitle-typo="typo-hint"
            subtitle-color="txt--light-graphite" />
    </ListElement>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
            draggableListID: this.item.code,
        };
    },
    computed: {
        ...mapGetters('list', [
            'isElementDisabled',
        ]),
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
