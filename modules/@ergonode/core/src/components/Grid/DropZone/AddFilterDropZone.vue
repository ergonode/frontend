/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <DropZone
            v-show="isDropZoneVisible"
            :layout-orientation="horizontalOrientation"
            title="ADD FILTER"
            @drop="onDropFilter">
            <template #icon="{ color }">
                <IconAddFilter :fill-color="color" />
            </template>
        </DropZone>
    </FadeTransition>
</template>

<script>
import DropZone from '@Core/components/DropZone/DropZone';
import IconAddFilter from '@Core/components/Icons/Actions/IconAddFilter';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    LAYOUT_ORIENTATION,
} from '@Core/defaults/layout';
import {
    mapState,
} from 'vuex';

export default {
    name: 'AddFilterDropZone',
    components: {
        FadeTransition,
        DropZone,
        IconAddFilter,
    },
    props: {
        filters: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
            'draggedElement',
        ]),
        horizontalOrientation() {
            return LAYOUT_ORIENTATION.HORIZONTAL;
        },
        isDropZoneVisible() {
            return this.isElementDragging === DRAGGED_ELEMENT.LIST
                && !this.filters.some(
                    filter => filter.id === this.draggedElement,
                );
        },
    },
    methods: {
        onDropFilter(payload) {
            this.$emit('drop', payload);
        },
    },
};
</script>
