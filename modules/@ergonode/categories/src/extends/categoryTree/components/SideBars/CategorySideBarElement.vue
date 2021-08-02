/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="item.id"
        :disabled="isDisabled"
        :hint="hint"
        :label="title"
        @drag-start="onDragStart"
        @drag-end="onDragEnd">
        <ListElementDescription>
            <ListElementTitle
                :title="title"
                :hint="hint" />
            <ListElementHint
                :title="itemCount"
                :hint="hint" />
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
    name: 'CategorySideBarElement',
    props: {
        scope: {
            type: String,
            default: '',
        },
        item: {
            type: Object,
            required: true,
        },
        languageCode: {
            type: String,
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
        ...mapState('list', [
            'disabledElements',
        ]),
        hint() {
            return this.item.name ? `#${this.item.code} ${this.languageCode}` : '';
        },
        title() {
            return this.item.name || `#${this.item.code}`;
        },
        itemCount() {
            const elementsCount = this.item.elements_count || 0;

            switch (elementsCount) {
            case 0:
                return `0 ${this.$t('@Categories.categoryTreeExtend.components.CategorySideBarElement.noProduct')}`;
            case 1:
                return `1 ${this.$t('@Categories.categoryTreeExtend.components.CategorySideBarElement.product')}`;
            default:
                return `${elementsCount} ${this.$t('@Categories.categoryTreeExtend.components.CategorySideBarElement.productPlural')}`;
            }
        },
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
