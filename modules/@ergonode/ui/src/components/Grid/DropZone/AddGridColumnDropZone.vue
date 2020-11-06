/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <DropZone
            v-show="isDropZoneVisible"
            title="ADD COLUMN"
            @drop="onDropColumn">
            <template #icon="{ color }">
                <IconAddColumn :fill-color="color" />
            </template>
        </DropZone>
    </FadeTransition>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import DropZone from '@UI/components/DropZone/DropZone';
import IconAddColumn from '@UI/components/Icons/Actions/IconAddColumn';
import FadeTransition from '@UI/components/Transitions/FadeTransition';
import {
    mapState,
} from 'vuex';

export default {
    name: 'AddGridColumnDropZone',
    components: {
        FadeTransition,
        DropZone,
        IconAddColumn,
    },
    props: {
        columnExist: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
        ]),
        isDropZoneVisible() {
            return this.isElementDragging === DRAGGED_ELEMENT.LIST && !this.columnExist;
        },
    },
    methods: {
        onDropColumn(payload) {
            this.$emit('drop', payload);
        },
    },
};
</script>
