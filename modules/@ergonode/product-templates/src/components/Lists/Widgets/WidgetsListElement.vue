/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :is-draggable="isAllowedToUpdate"
        :draggable-id="item.type"
        :label="item.label"
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
import ListDraggableElement from '@Core/components/List/ListDraggableElement';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementHint from '@Core/components/List/ListElementHint';
import ListElementIcon from '@Core/components/List/ListElementIcon';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import PRIVILEGES from '@Templates/config/privileges';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'WidgetsListElement',
    components: {
        ListElementDescription,
        ListElementTitle,
        ListDraggableElement,
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
            return () => import('@Core/components/Icons/Editor/IconFontSize');
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.TEMPLATE_DESIGNER.update,
            ]);
        },
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggedElement',
        ]),
        onDrag(isDragged) {
            if (isDragged) {
                this.setDraggedElement(this.item.type);
            } else {
                this.setDraggedElement();
            }
        },
    },
};
</script>
