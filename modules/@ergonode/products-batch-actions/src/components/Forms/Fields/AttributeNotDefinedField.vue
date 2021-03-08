/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DraggableFormNotDefinedItem :title="title" />
</template>

<script>
import DraggableFormNotDefinedItem from '@UI/components/DraggableForm/DraggableFormNotDefinedItem';

export default {
    name: 'AttributeNotDefinedField',
    components: {
        DraggableFormNotDefinedItem,
    },
    props: {
        attribute: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        title() {
            return this.$t('@ProductsBatchActions.productBatchAction.components.AttributeNotDefinedField.title', {
                info: this.attribute.type,
            });
        },
    },
};
</script>
