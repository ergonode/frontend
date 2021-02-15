/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="draggable-form">
        <DropZone
            v-show="false"
            title="ADD ITEM"
            @drop="onDropFormItem">
            <template #icon="{ color }">
                <IconAddFilter :fill-color="color" />
            </template>
        </DropZone>
        <Form
            :title="title"
            :disabled="disabled"
            :errors="errors"
            :change-values="changeValues"
            :errors-presentation-mapper="errorsPresentationMapper">
            <template #body>
                <DraggableFormPlaceholderItem v-if="!items.length" />
            </template>
        </Form>
    </div>
</template>

<script>
import DraggableFormItem from '@UI/components/DraggableForm/DraggableFormItem';
import DraggableFormPlaceholderItem from '@UI/components/DraggableForm/DraggableFormPlaceholderItem';
import DropZone from '@UI/components/DropZone/DropZone';
import Form from '@UI/components/Form/Form';
import IconAddFilter from '@UI/components/Icons/Actions/IconAddFilter';

export default {
    name: 'DraggableForm',
    components: {
        Form,
        DropZone,
        IconAddFilter,
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
    methods: {
        onDropFormItem() {
            console.log('dropped');
        },
    },
};
</script>

<style lang="scss" scoped>
    .draggable-form {
        position: relative;
    }
</style>
