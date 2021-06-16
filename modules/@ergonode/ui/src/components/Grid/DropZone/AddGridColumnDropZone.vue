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
import DropZone from '@UI/components/DropZone/DropZone';
import IconAddColumn from '@UI/components/Icons/Actions/IconAddColumn';
import FadeTransition from '@UI/components/Transitions/FadeTransition';

export default {
    name: 'AddGridColumnDropZone',
    components: {
        FadeTransition,
        DropZone,
        IconAddColumn,
    },
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
