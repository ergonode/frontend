/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="`${item.code}:${languageCode}`"
        :is-draggable="$hasAccess('ATTRIBUTE_UPDATE')"
        :is-disabled="disabledElements[languageCode] && disabledElements[languageCode][item.id]"
        @drag="onDrag">
        <ListElementIcon :icon-path="typeIcon" />
        <ListElementDescription>
            <ListElementSubtitle :subtitle="item.code" />
            <ListElementTitle :title="item.label || 'No translation'" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getTypeTranslation, getIcon } from '~/model/attributes/AttributeTypes';

export default {
    name: 'AttributeListElement',
    components: {
        ListDraggableElement: () => import('~/components/List/ListDraggableElement'),
        ListElementIcon: () => import('~/components/List/ListElementIcon'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/components/List/ListElementTitle'),
        ListElementSubtitle: () => import('~/components/List/ListElementSubtitle'),
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
    },
    computed: {
        ...mapState('list', {
            disabledElements: (state) => state.disabledElements,
        }),
        typeIcon() {
            return `Attributes/Icon${getIcon(this.item.type)}`;
        },
        typeTranslation() {
            return getTypeTranslation(this.item.type);
        },
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggedElement',
            'setDraggableState',
        ]),
        onDrag(isDragged) {
            if (isDragged) {
                this.setDraggedElement(`${this.item.code}:${this.languageCode}`);
            } else {
                this.setDraggedElement();
            }

            this.setDraggableState({ propName: 'isListElementDragging', value: isDragged });
        },
    },
};
</script>
