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
import ListDraggableElement from '@UI/components/List/ListDraggableElement';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementHint from '@UI/components/List/ListElementHint';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CategorySideBarElement',
    components: {
        ListDraggableElement,
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
        disabled: {
            type: Boolean,
            default: false,
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
                || (this.disabledElements[this.languageCode]
                    && this.disabledElements[this.languageCode][this.item.id]);
        },
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        onDragStart() {
            this.__setState({
                key: 'isElementDragging',
                value: DRAGGED_ELEMENT.LIST,
            });
            this.__setState({
                key: 'draggedElement',
                value: {
                    id: this.item.id,
                    code: this.item.code,
                    name: this.item.name,
                },
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
        },
    },
};
</script>
