/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :is-draggable="$hasAccess(['TEMPLATE_DESIGNER_UPDATE'])"
        :draggable-id="item.type"
        @drag="onDrag">
        <ListElementIcon>
            <Component :is="widgetIconComponent" />
        </ListElementIcon>
        <ListElementDescription>
            <ListElementTitle :title="item.label" />
            <ListElementHint :title="item.code" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import { mapActions } from 'vuex';
import ListElementDescription from '~/core/components/List/ListElementDescription';
import ListElementTitle from '~/core/components/List/ListElementTitle';
import ListElementHint from '~/core/components/List/ListElementHint';
import ListElementIcon from '~/core/components/List/ListElementIcon';

export default {
    name: 'WidgetsListElement',
    components: {
        ListElementDescription,
        ListElementTitle,
        ListDraggableElement: () => import('~/core/components/List/ListDraggableElement'),
        ListElementIcon,
        ListElementHint,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        widgetIconComponent() {
            return () => import('~/components/Icon/Editor/IconFontSize');
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
