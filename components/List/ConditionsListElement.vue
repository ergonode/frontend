/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :is-draggable="$hasAccess('SEGMENT_UPDATE')"
        :draggable-id="item.id"
        @drag="onDrag">
        <ListElementDescription>
            <ListElementSubtitle subtitle="Short description" />
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
        ListElementSubtitle: () => import('~/components/List/ListElementSubtitle'),
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
            const uniqId = `${this.item.id}--${getUUID()}`;
            if (isDragged) {
                this.setDraggedElement(uniqId);
            } else {
                this.setDraggedElement();
            }

            this.setDraggableState({ propName: 'isListElementDragging', value: isDragged });
        },
    },
};
</script>
