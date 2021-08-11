/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :disabled="disabled"
        :draggable-id="item.type"
        :label="typeTranslation"
        @drag-start="onDragStart"
        @drag-end="onDragEnd">
        <ListElementIcon>
            <IconFontSize />
        </ListElementIcon>
        <ListElementDescription>
            <ListElementTitle :title="typeTranslation" />
            <ListElementHint :title="item.code" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import IconFontSize from '@UI/components/Icons/Editor/IconFontSize';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'WidgetSideBarElement',
    components: {
        IconFontSize,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        item: {
            type: Object,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Type of the place from where element is dragging
         */
        draggingElementType: {
            type: String,
            default: DRAGGED_ELEMENT.LIST,
        },
    },
    computed: {
        typeTranslation() {
            const {
                type: keyType,
                label,
            } = this.item;

            if (this.$te(`@Templates.productTemplate._.types.${keyType}`)) {
                return this.$t(`@Templates.productTemplate._.types.${keyType}`);
            }

            return label;
        },
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        onDragStart() {
            this.__setState({
                key: 'isElementDragging',
                value: this.draggingElementType,
            });
            this.__setState({
                key: 'draggedElement',
                value: this.item.type,
            });
            this.__setState({
                key: 'draggedInScope',
                value: this.scope,
            });
        },
        onDragEnd() {
            this.__setState({
                key: 'isElementDragging',
                value: null,
            });
            this.__setState({
                key: 'draggedElement',
                value: null,
            });
            this.__setState({
                key: 'draggedInScope',
                value: '',
            });
        },
    },
};
</script>
