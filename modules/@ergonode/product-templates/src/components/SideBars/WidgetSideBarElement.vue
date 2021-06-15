/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :disabled="disabled"
        :draggable-id="item.type"
        :label="item.label"
        @drag-start="onDragStart"
        @drag-end="onDragEnd">
        <ListElementIcon>
            <IconFontSize />
        </ListElementIcon>
        <ListElementDescription>
            <ListElementTitle :title="item.label" />
            <ListElementHint :title="item.code" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import IconFontSize from '@UI/components/Icons/Editor/IconFontSize';
import ListDraggableElement from '@UI/components/List/ListDraggableElement';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementHint from '@UI/components/List/ListElementHint';
import ListElementIcon from '@UI/components/List/ListElementIcon';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'WidgetSideBarElement',
    components: {
        ListElementDescription,
        ListElementTitle,
        ListDraggableElement,
        ListElementIcon,
        ListElementHint,
        IconFontSize,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Type of the place from where element is dragging
         */
        draggingElementType: {
            type: String,
            default: DRAGGED_ELEMENT.LIST,
        },
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        onDragStart() {
            this.__setState({
                key: 'isElementDragging',
                value: this.draggingElementType,
            });
            this.__setState({
                key: 'draggedElement',
                value: this.item.type,
            });
        },
        onDragEnd() {
            this.__setState({
                key: 'isElementDragging',
                value: null,
            });
            this.__setState({
                key: 'draggedElement',
                value: null,
            });
        },
    },
};
</script>
