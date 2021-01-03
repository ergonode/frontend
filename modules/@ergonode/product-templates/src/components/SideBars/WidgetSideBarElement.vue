/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="item.type"
        :draggable="isDraggable"
        :dragged-element="item.type"
        :label="item.label">
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
import ListDraggableElement from '@UI/components/List/ListDraggableElement';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementHint from '@UI/components/List/ListElementHint';
import ListElementIcon from '@UI/components/List/ListElementIcon';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import IconFontSize from "@UI/components/Icons/Editor/IconFontSize";
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
        isDraggable: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
