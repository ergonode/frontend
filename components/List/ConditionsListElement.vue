/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :is-draggable="$hasAccess(['SEGMENT_UPDATE'])"
        :draggable-id="item.id"
        @drag="onDrag">
        <ListElementDescription>
            <ListElementTitle :title="item.name" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import { mapActions } from 'vuex';
import { getUUID } from '~/model/stringWrapper';

export default {
    name: 'ConditionsListElement',
    components: {
        ListDraggableElement: () => import('~/components/List/ListDraggableElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/components/List/ListElementTitle'),
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggedElement',
            'setDraggableState',
        ]),
        onDrag(isDragged) {
            const { id, name, code } = this.item;
            if (isDragged) {
                this.setDraggedElement({ id: `${id}--${getUUID()}`, name, code });
            } else {
                this.setDraggedElement();
            }

            this.setDraggableState({ propName: 'isListElementDragging', value: isDragged });
        },
    },
};
</script>
