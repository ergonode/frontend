/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="draggable-form">
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
                    :key="item.id"
                    :index="index"
                    :item="item"
                    @add-ghost="onAddGhost"
                    @add-item="onAddItem"
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
    swapItemPosition,
} from '@Core/models/arrayWrapper';
import DraggableFormItem from '@UI/components/DraggableForm/DraggableFormItem';
import DraggableFormPlaceholderItem from '@UI/components/DraggableForm/DraggableFormPlaceholderItem';
import Form from '@UI/components/Form/Form';

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
    watch: {
        items: {
            immediate: true,
            handler() {
                this.localItems = this.items;
            },
        },
    },
    methods: {
        onAddGhost(index) {
            this.localItems[index] = {
                id: this.localItems[index].id,
                isGhost: true,
            };

            this.localItems = [
                ...this.localItems,
            ];
        },
        onAddItem({
            item,
            index,
        }) {
            this.localItems[index] = item;

            this.localItems = [
                ...this.localItems,
            ];
        },
        onRemoveItem(index) {
            this.$emit('remove-item', index);
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
