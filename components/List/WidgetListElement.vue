/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :is-draggable="$hasAccess('TEMPLATE_DESIGNER_UPDATE')"
        :draggable-id="item.type"
        @drag="onDrag">
        <ListElementHintIcon
            icon-path="Editor/IconFontSize"
            hint="Title" />
        <ListElementDescription>
            <ListElementTitle :title="item.label" />
            <ListElementHint :title="item.code" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'AttributeListElement',
    components: {
        ListDraggableElement: () => import('~/components/List/ListDraggableElement'),
        ListElementHintIcon: () => import('~/components/List/ListElementHintIcon'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/components/List/ListElementTitle'),
        ListElementHint: () => import('~/components/List/ListElementHint'),
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
            if (isDragged) {
                this.setDraggedElement(this.item.type);
            } else {
                this.setDraggedElement();
            }

            this.setDraggableState({ propName: 'isListElementDragging', value: isDragged });
        },
    },
};
</script>
