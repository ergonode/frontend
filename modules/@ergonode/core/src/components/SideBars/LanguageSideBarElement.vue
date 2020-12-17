/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="item.id"
        :draggable="isDraggable"
        :disabled="disabledElements[languageCode] && disabledElements[languageCode][item.id]"
        :hint="item.name ? `#${item.code}` : ''"
        :label="item.name"
        @drag="onDrag">
        <ListElementDescription>
            <ListElementTitle :title="item.name" />
            <ListElementHint :title="item.code" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import ListDraggableElement from '@UI/components/List/ListDraggableElement';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementHint from '@UI/components/List/ListElementHint';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'LanguageSideBarElement',
    components: {
        ListDraggableElement,
        ListElementDescription,
        ListElementTitle,
        ListElementHint,
    },
    props: {
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
         * Determines state of draggable attribute
         */
        isDraggable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('list', [
            'disabledElements',
        ]),
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
