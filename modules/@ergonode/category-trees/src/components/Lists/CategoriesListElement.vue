/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="item.id"
        :draggable="isDraggable"
        :disabled="isDisabled"
        :hint="hint"
        :label="title"
        @drag="onDrag">
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
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementHint from '@Core/components/List/ListElementHint';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CategoriesListElement',
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
        ...mapState('list', [
            'disabledElements',
        ]),
        isDisabled() {
            return this.disabledElements[this.languageCode]
                && this.disabledElements[this.languageCode][this.item.id];
        },
        hint() {
            return this.item.name ? `#${this.item.code} ${this.languageCode}` : '';
        },
        title() {
            return this.item.name || `#${this.item.code}`;
        },
        itemCount() {
            return `${this.item.elements_count || 0} Product${this.item.elements_count === 1 ? '' : 's'}`;
        },
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        onDrag(isDragged) {
            this.__setState({
                key: 'draggedElement',
                value: isDragged
                    ? {
                        id: this.item.id,
                        code: this.item.code,
                        name: this.item.name,
                    }
                    : null,
            });
        },
    },
};
</script>
