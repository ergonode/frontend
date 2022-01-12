/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="item.id"
        :disabled="disabled"
        :label="item.name"
        @drag-start="onDragStart"
        @drag-end="onDragEnd">
        <ListElementDescription>
            <ListElementTitle :title="item.name" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ConditionSideBarElement',
    props: {
        scope: {
            type: String,
            default: '',
        },
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
                value: {
                    id: getUUID(),
                    type: this.item.id,
                    name: this.item.name,
                    code: this.item.code,
                },
            });
            this.__setState({
                key: 'draggedInScope',
                value: this.scope,
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
            this.__setState({
                key: 'draggedInScope',
                value: '',
            });
        },
    },
};
</script>
