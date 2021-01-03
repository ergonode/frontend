/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="item.id"
        :dragged-element="item"
        :draggable="isDraggable"
        :disabled="isDisabled"
        :hint="hint"
        :label="title">
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
import ListDraggableElement from '@UI/components/List/ListDraggableElement';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementHint from '@UI/components/List/ListElementHint';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import {
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
};
</script>
