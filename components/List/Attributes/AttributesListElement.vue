/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="`${item.code}:${languageCode}`"
        :is-draggable="$hasAccess(['ATTRIBUTE_UPDATE'])"
        :is-disabled="disabledElements[languageCode] && disabledElements[languageCode][item.id]"
        :hint="item.label ? `#${item.code} ${languageCode}`: ''"
        @drag="onDrag">
        <ListElementIcon>
            <Component :is="typeIconComponent" />
        </ListElementIcon>
        <ListElementDescription>
            <ListElementTitle :title="item.label || `#${item.code}`" />
            <ListElementHint :title="formattedAttributeType" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { capitalizeAndConcatenationArray } from '~/model/stringWrapper';

export default {
    name: 'AttributesListElement',
    components: {
        ListDraggableElement: () => import('~/core/components/List/ListDraggableElement'),
        ListElementIcon: () => import('~/core/components/List/ListElementIcon'),
        ListElementDescription: () => import('~/core/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/core/components/List/ListElementTitle'),
        ListElementHint: () => import('~/core/components/List/ListElementHint'),
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
        typeIconComponent() {
            return () => import(`~/components/Icon/Attributes/Icon${this.formattedAttributeType}`);
        },
        formattedAttributeType() {
            return capitalizeAndConcatenationArray(this.item.type.split('_'));
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
