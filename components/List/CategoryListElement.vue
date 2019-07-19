/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListElement
        :key="item.id"
        v-draggable-element="{
            id: draggableListID,
            draggedElementStyle,
            onDraggedState,
        }"
        :dragged="isDragged"
        :disabled="isElementDisabled(draggableListID, languageCode)">
        <ListElementDescription
            :title="getCategoryName()"
            :subtitle="productsCount"
            title-typo="typo-subtitle"
            title-color="txt--dark-graphite"
            subtitle-typo="typo-hint"
            subtitle-color="txt--light-graphite" />
        <span
            v-if="isTranslation"
            class="typo-hint txt--light-graphite">No translation</span>
    </ListElement>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DraggableStates from '~/model/draggableStates';

export default {
    name: 'CategoryListElement',
    components: {
        ListElement: () => import('~/components/List/ListElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
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
    data() {
        return {
            isDragged: false,
            isTranslation: false,
            draggedElementStyle: { width: 246, height: 32, backgroundColor: '#fff' },
            draggableListID: this.item.id,
        };
    },
    computed: {
        ...mapGetters('list', [
            'isElementDisabled',
        ]),
        productsCount() {
            return `${this.item.elements_count || 0} Product${this.item.elements_count === 1 ? '' : 's'}`;
        },
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggedElement',
            'setDraggableState',
        ]),
        onDraggedState(event) {
            switch (event.detail.state) {
            case DraggableStates.START:
                this.isDragged = true;
                this.setDraggedElement(event.target.id);
                break;
            case DraggableStates.END:
                this.isDragged = false;
                this.setDraggedElement();
                break;
            default: break;
            }

            this.setDraggableState({ propName: 'isListElementDragging', value: this.isDragged });
        },
        getCategoryName() {
            const { name, code } = this.item;
            if (!name) {
                this.isTranslation = true;
                return code;
            }
            return name;
        },
    },
};
</script>
