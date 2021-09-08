/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
import ListDraggableElement from '@UI/components/List/ListDraggableElement';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ConditionSideBarElement',
    components: {
        ListElementDescription,
        ListElementTitle,
        ListDraggableElement,
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
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        onDragStart() {
            this.__setState({
                key: 'isElementDragging',
                value: DRAGGED_ELEMENT.LIST,
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
