/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="item.id"
        :dragged-element="draggedElement"
        :draggable="!disabled"
        :disabled="disabled"
        :label="item.name">
        <ListElementDescription>
            <ListElementTitle :title="item.name" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
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
    computed: {
        draggedElement() {
            return {
                id: `${this.item.id}--${getUUID()}`,
                name: this.item.name,
                code: this.item.code,
            };
        },
    },
};
</script>
