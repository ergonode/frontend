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
        :label="title"
        @drag="onDrag">
        <ListElementIcon>
            <Component :is="typeIconComponent" />
        </ListElementIcon>
        <ListElementDescription>
            <ListElementTitle
                :title="title"
                :hint="hint" />
            <ListElementHint
                :title="formattedAttributeType"
                :hint="hint" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import {
    TYPES,
} from '@Attributes/defaults/attributes';
import ListDraggableElement from '@Core/components/List/ListDraggableElement';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementHint from '@Core/components/List/ListElementHint';
import ListElementIcon from '@Core/components/List/ListElementIcon';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributesListElement',
    components: {
        ListElementDescription,
        ListElementTitle,
        ListElementHint,
        ListElementIcon,
        ListDraggableElement,
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
            disabledElements: state => state.disabledElements,
        }),
        title() {
            return this.item.label || `#${this.item.code}`
        },
        typeIconComponent() {
            if (typeof TYPES[this.item.type] === 'undefined') {
                return () => import('@Core/components/Icons/Attributes/IconText');
            }
            return () => import(`@Core/components/Icons/Attributes/Icon${this.formattedAttributeType}`);
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

            this.setDraggableState({
                propName: 'isListElementDragging',
                value: isDragged,
            });
        },
    },
};
</script>
