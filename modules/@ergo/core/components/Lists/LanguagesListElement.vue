/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="item.id"
        :is-draggable="isDraggable"
        :is-disabled="disabledElements[languageCode] && disabledElements[languageCode][item.id]"
        :hint="item.name ? `#${item.code}` : ''"
        :label="item.name"
        @drag="onDrag">
        <ListElementDescription>
            <ListElementTitle :title="item.name" />
            <ListElementHint :title="item.code" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementHint from '@Core/components/List/ListElementHint';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'LanguagesListElement',
    components: {
        ListDraggableElement: () => import('@Core/components/List/ListDraggableElement'),
        ListElementDescription,
        ListElementTitle,
        ListElementHint,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
        languageCode: {
            type: String,
            required: true,
        },
        isDraggable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('list', {
            disabledElements: state => state.disabledElements,
        }),
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggedElement',
            'setDraggableState',
        ]),
        onDrag(isDragged) {
            if (isDragged) {
                const {
                    id, code, name,
                } = this.item;
                this.setDraggedElement({
                    id,
                    code,
                    name,
                });
            } else {
                this.setDraggedElement();
            }

            this.setDraggableState({
                propName: 'isListElementDragging',
                value: isDragged,
            });
        },
    },
};
</script>
