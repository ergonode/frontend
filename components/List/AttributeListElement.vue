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
            draggable: !draggingDisabled,
        }"
        :dragged="isDragged"
        :disabled="disabledElements[languageCode] && disabledElements[languageCode][item.id]">
        <ListElementIcon :icon-path="iconByType" />
        <ListElementDescription
            :title="item.type"
            :subtitle="item.label || item.code" />
    </ListElement>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DraggableStates from '~/model/draggableStates';
import { capitalizeAndConcatenationArray } from '~/model/stringWrapper';

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
        draggingDisabled: {
            type: Boolean,
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
        ...mapState('list', {
            disabledElements: state => state.disabledElements,
        }),
        iconByType() {
            if (!this.item.type) return '';

            const types = this.item.type.split('_');
            const attributeName = capitalizeAndConcatenationArray(types);

            return `Attributes/Icon${attributeName}`;
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
