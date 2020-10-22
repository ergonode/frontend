/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable="!disabled"
        :disabled="disabled"
        :draggable-id="item.id"
        :label="item.name"
        @drag="onDrag">
        <ListElementDescription>
            <ListElementTitle :title="item.name" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ConditionsListElement',
    components: {
        ListElementDescription,
        ListElementTitle,
        ListDraggableElement: () => import('@Core/components/List/ListDraggableElement'),
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
        disabled: {
            type: Boolean,
            deafulr: false,
        },
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        onDrag(isDragged) {
            this.__setState({
                key: 'draggedElement',
                value: isDragged
                    ? {
                        id: `${this.item.id}--${getUUID()}`,
                        name: this.item.name,
                        code: this.item.code,
                    }
                    : null,
            });
        },
    },
};
</script>
