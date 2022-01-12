/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <DropZone
            v-show="isDropZoneVisible"
            :hover-background-color="graphiteLightColor"
            :title="dropZoneTitle">
            <template #icon="{ color }">
                <IconRemoveColumn
                    v-if="isColumnDragging"
                    :fill-color="color" />
                <IconRemoveFilter
                    v-else-if="isFilterDragging"
                    :fill-color="color" />
            </template>
        </DropZone>
    </FadeTransition>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    GRAPHITE_LIGHT,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    mapState,
} from 'vuex';

export default {
    name: 'RemoveFilterAndColumnDropZone',
    props: {
        scope: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
            'draggedElement',
            'draggedInScope',
        ]),
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
        dropZoneTitle() {
            if (!this.isElementDragging) {
                return '';
            }

            return this.isColumnDragging
                ? 'REMOVE COLUMN'
                : 'REMOVE FILTER';
        },
        isColumnDragging() {
            return this.isElementDragging === DRAGGED_ELEMENT.COLUMN;
        },
        isFilterDragging() {
            return this.isElementDragging === DRAGGED_ELEMENT.FILTER;
        },
        isDropZoneVisible() {
            if (
                (this.draggedInScope !== this.scope)
                || (this.draggedElement && typeof this.draggedElement.deletable !== 'undefined' && !this.draggedElement.deletable)) {
                return false;
            }

            return this.isColumnDragging
                || this.isFilterDragging;
        },
    },
};
</script>
