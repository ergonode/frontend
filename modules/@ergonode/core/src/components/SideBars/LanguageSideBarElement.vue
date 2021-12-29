/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="item.id"
        :disabled="isDisabled"
        :hint="item.name ? `#${item.code}` : ''"
        :label="item.name"
        @drag-start="onDragStart"
        @drag-end="onDragEnd">
        <ListElementDescription>
            <ListElementTitle :title="item.name" />
            <ListElementHint :title="item.code" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'LanguageSideBarElement',
    props: {
        scope: {
            type: String,
            default: '',
        },
        /**
         * Item data model
         */
        item: {
            type: Object,
            required: true,
        },
        /**
         * Code of the language
         */
        languageCode: {
            type: String,
            required: true,
        },
        /**
         * Determinate if the component is disabled
         */
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
        ...mapState('list', [
            'disabledElements',
        ]),
        isDisabled() {
            return this.disabled
                || (this.disabledElements[this.scope]
                    && this.disabledElements[this.scope][this.languageCode]
                    && this.disabledElements[this.scope][this.languageCode][this.item.id]);
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
                value: {
                    id: this.item.id,
                    code: this.item.code,
                    name: this.item.name,
                },
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
