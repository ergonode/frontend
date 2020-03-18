/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="`${item.code}:${languageCode}`"
        :is-draggable="isDraggable"
        :is-disabled="disabledElements[languageCode] && disabledElements[languageCode][item.id]"
        :hint="hint"
        @drag="onDrag">
        <ListElementIcon>
            <Component :is="typeIconComponent" />
        </ListElementIcon>
        <ListElementDescription>
            <ListElementTitle
                :title="item.label || `#${item.code}`"
                :hint="hint" />
            <ListElementHint
                :title="formattedAttributeType"
                :hint="hint" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { TYPES } from '~/defaults/attributes';
import { capitalizeAndConcatenationArray } from '~/model/stringWrapper';
import ListElementDescription from '~/core/components/List/ListElementDescription';
import ListElementTitle from '~/core/components/List/ListElementTitle';
import ListElementHint from '~/core/components/List/ListElementHint';
import ListElementIcon from '~/core/components/List/ListElementIcon';

export default {
    name: 'AttributesListElement',
    components: {
        ListElementDescription,
        ListElementTitle,
        ListElementHint,
        ListElementIcon,
        ListDraggableElement: () => import('~/core/components/List/ListDraggableElement'),
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
            default: true,
        },
    },
    computed: {
        ...mapState('list', {
            disabledElements: (state) => state.disabledElements,
        }),
        typeIconComponent() {
            if (typeof TYPES[this.item.type] === 'undefined') {
                return () => import('~/components/Icon/Attributes/IconText');
            }
            return () => import(`~/components/Icon/Attributes/Icon${this.formattedAttributeType}`);
        },
        formattedAttributeType() {
            return capitalizeAndConcatenationArray(this.item.type.split('_'));
        },
        hint() {
            return this.item.label ? `#${this.item.code} ${this.languageCode}` : '';
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
