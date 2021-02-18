/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="draggable-form"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave">
        <Form
            :title="title"
            :disabled="disabled"
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
                <DraggableFormPlaceholderItem v-if="!localItems.length" />
                <DraggableFormItem
                    v-for="(item, index) in localItems"
                    :key="index"
                    :index="index"
                    :item="item"
                    @remove-item="onRemoveItem"
                    @add-item="onAddItem"
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
import Form from '@UI/components/Form/Form';
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
        Form,
        DraggableFormPlaceholderItem,
        DraggableFormItem,
    },
    props: {
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
                ? formElement.getAttribute('index')
                : 0;

            console.log('enter', index);

            this.localItems = insertValueAtIndex(this.localItems, this.draggedElement, index);

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
        onRemoveItem(index) {
            this.$emit('remove-item', index);
        },
        onAddItem(payload) {
            this.$emit('add-item', payload);
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
