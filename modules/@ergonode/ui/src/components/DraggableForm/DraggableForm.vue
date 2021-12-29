/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="draggable-form"
        @drop="onDrop"
        @dragenter="onDragEnter"
        @dragover="onDragOver">
        <Form
            :title="title"
            :disabled="disabled"
            :width="width"
            :errors="errors"
            :change-values="changeValues"
            :errors-presentation-mapper="errorsPresentationMapper">
            <template #header>
                <h2
                    v-if="title"
                    class="draggable-form__title"
                    v-text="title" />
            </template>
            <template #body>
                <DraggableFormPlaceholderItem v-if="isPlaceholderItemVisible" />
                <DraggableFormItem
                    v-for="(item, index) in localItems"
                    :key="`${item.id || item.fieldKey}|${item.languageCode || ''}`"
                    :scope="scope"
                    :index="index"
                    :item="item"
                    @remove-item="onRemoveItem"
                    @swap="onSwapItems"
                    @drag-end="onDragEndItem">
                    <template #item>
                        <slot
                            name="item"
                            :item="item" />
                    </template>
                </DraggableFormItem>
            </template>
        </Form>
    </div>
</template>

<script>
import {
    insertValueAtIndex,
    swapItemPosition,
} from '@Core/models/arrayWrapper';
import DraggableFormItem from '@UI/components/DraggableForm/DraggableFormItem';
import DraggableFormPlaceholderItem from '@UI/components/DraggableForm/DraggableFormPlaceholderItem';
import {
    getFixedMousePosition,
} from '@UI/models/mouse';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'DraggableForm',
    components: {
        DraggableFormPlaceholderItem,
        DraggableFormItem,
    },
    props: {
        /**
         * Context scope
         */
        scope: {
            type: String,
            default: '',
        },
        /**
         * List of form items
         */
        items: {
            type: Array,
            default: () => [],
        },
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * Component width
         */
        width: {
            type: [
                Number,
                String,
            ],
            default: 352,
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Values that have been changes at given context
         */
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The parsing validation errors function for custom presentation format
         */
        errorsPresentationMapper: {
            type: Function,
            default: null,
        },
        /**
         * Show drag & drop placeholder
         */
        hasDropPlaceholder: {
            type: Boolean,
            default: true,
        },
        /**
         * The key of the option
         */
        optionKey: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            localItems: [],
        };
    },
    computed: {
        ...mapState('draggable', [
            'ghostIndex',
            'draggedElement',
        ]),
        isPlaceholderItemVisible() {
            return this.hasDropPlaceholder && (!this.localItems.length
                || (this.localItems.length === 1 && this.draggedElement && this.ghostIndex === -1));
        },
    },
    watch: {
        items: {
            immediate: true,
            handler() {
                this.localItems = [
                    ...this.items,
                ];
            },
        },
        draggedElement(newValue, oldValue) {
            if (!this.draggedElement && this.ghostIndex !== -1 && oldValue) {
                this.$emit('add-item', {
                    index: this.ghostIndex,
                    item: oldValue,
                });

                this.localItems.splice(this.ghostIndex, 1);

                this.__setState({
                    key: 'ghostIndex',
                    value: -1,
                });
            }
        },
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        onDragEnter(event) {
            if (this.ghostIndex !== -1) {
                return;
            }

            const {
                xPos, yPos,
            } = getFixedMousePosition(event);
            const formElement = document.elementsFromPoint(xPos, yPos).find(element => element.hasAttribute('index'));

            const index = formElement
                ? +formElement.getAttribute('index')
                : 0;

            this.localItems = insertValueAtIndex(this.localItems, this.draggedElement, index);

            this.__setState({
                key: 'ghostIndex',
                value: index,
            });
        },
        onDragOver(event) {
            event.preventDefault();
        },
        onDrop(event) {
            if (this.ghostIndex !== -1 && this.localItems.length !== this.items.length) {
                this.$emit('add-item', {
                    index: this.ghostIndex,
                    item: this.draggedElement,
                });

                this.__setState({
                    key: 'draggedElement',
                    value: null,
                });
                this.__setState({
                    key: 'draggedInScope',
                    value: '',
                });
                this.__setState({
                    key: 'ghostIndex',
                    value: -1,
                });
            }

            if (this.ghostIndex !== -1) {
                this.$emit('move-item', {
                    index: this.ghostIndex,
                    items: this.localItems,
                });
            }

            event.preventDefault();
        },
        onDragEndItem(index) {
            const optionKey = this.optionKey || 'id';
            const newItemId = this.localItems[index][optionKey];
            const oldItemIndex = this.items.findIndex(item => item[optionKey] === newItemId);

            if (index !== oldItemIndex) {
                this.$emit('move-item', {
                    index,
                    items: this.localItems,
                });
            }
        },
        onRemoveItem(item) {
            this.$emit('remove-item', item);
        },
        onSwapItems({
            from,
            to,
        }) {
            this.localItems = swapItemPosition(this.localItems, from, to);
        },
    },
};
</script>

<style lang="scss" scoped>
    .draggable-form {
        position: relative;

        &__title {
            margin-left: 32px;
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_16_24;
        }
    }
</style>
