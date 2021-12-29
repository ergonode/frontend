/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <DropZone
            v-show="isVisible"
            title="ADD COLUMN"
            @drop="onDropColumn">
            <template #icon="{ color }">
                <IconAddColumn :fill-color="color" />
            </template>
        </DropZone>
    </FadeTransition>
</template>

<script>
export default {
    name: 'AddGridColumnDropZone',
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onDropColumn(payload) {
            this.$emit('drop', payload);
        },
    },
};
</script>
