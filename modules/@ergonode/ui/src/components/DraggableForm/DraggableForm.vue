/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="draggable-form"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @drop="onDrop"
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
                    :key="`${item.id}|${item.languageCode}`"
                    :scope="scope"
                    :index="index"
                    :item="item"
                    @remove-item="onRemoveItem"
                    @swap="onSwapItems">
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
    isMouseOutsideElement,
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
            'draggedElIndex',
        ]),
        itemsOrder() {
            return this.localItems.map(item => item.id);
        },
        isPlaceholderItemVisible() {
            return !this.localItems.length
                || (this.localItems.length === 1 && this.draggedElement && this.ghostIndex === -1);
        },
    },
    watch: {
        items: {
            immediate: true,
            handler() {
                this.localItems = [
                    ...this.items,
                ].sort(
                    (a, b) => this.itemsOrder.indexOf(a.id) - this.itemsOrder.indexOf(b.id),
                );
            },
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

            if (this.draggedElIndex === -1) {
                this.localItems = insertValueAtIndex(this.localItems, this.draggedElement, index);
            }

            this.__setState({
                key: 'ghostIndex',
                value: index,
            });
        },
        onDragLeave(event) {
            const {
                xPos,
                yPos,
            } = getFixedMousePosition(event);

            if (isMouseOutsideElement(this.$el, xPos, yPos) && this.ghostIndex !== -1) {
                if (this.draggedElIndex === -1) {
                    this.localItems.splice(this.ghostIndex, 1);
                }

                this.__setState({
                    key: 'ghostIndex',
                    value: -1,
                });
            }
        },
        onDragOver(event) {
            event.preventDefault();
        },
        onDrop(event) {
            if (this.draggedElIndex === -1 && this.ghostIndex !== -1) {
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

            event.preventDefault();
        },
        onRemoveItem(item) {
            this.$emit('remove-item', item);
        },
        onSwapItems({
            from,
            to,
        }) {
            this.localItems = swapItemPosition(this.localItems, from, to);
            this.localItems = [
                ...this.localItems,
            ];
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
