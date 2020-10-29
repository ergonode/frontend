/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <DropZone
            v-show="isDropZoneVisible"
            :hover-background-color="graphiteLightColor"
            :title="dropZoneTitle">
            <template #icon="{ color }">
                <Component
                    :is="dropZoneIconComponent"
                    :fill-color="color" />
            </template>
        </DropZone>
    </FadeTransition>
</template>

<script>
import {
    GRAPHITE_LIGHT,
} from '@Core/assets/scss/_js-variables/colors.scss';
import DropZone from '@Core/components/DropZone/DropZone';
import IconRemoveColumn from '@Core/components/Icons/Actions/IconRemoveColumn';
import IconRemoveFilter from '@Core/components/Icons/Actions/IconRemoveFilter';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    mapState,
} from 'vuex';

export default {
    name: 'RemoveFilterAndColumnDropZone',
    components: {
        DropZone,
        FadeTransition,
    },
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
            'draggedElement',
        ]),
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
        dropZoneTitle() {
            if (!this.isElementDragging) {
                return '';
            }

            return this.isElementDragging === DRAGGED_ELEMENT.COLUMN
                ? 'REMOVE COLUMN'
                : 'REMOVE FILTER';
        },
        dropZoneIconComponent() {
            if (!this.isElementDragging) {
                return null;
            }

            return this.isElementDragging === DRAGGED_ELEMENT.COLUMN
                ? IconRemoveColumn
                : IconRemoveFilter;
        },
        isDropZoneVisible() {
            if (this.draggedElement
                && typeof this.draggedElement.deletable !== 'undefined'
                && !this.draggedElement.deletable) {
                return false;
            }

            return this.isElementDragging === DRAGGED_ELEMENT.COLUMN
                || this.isElementDragging === DRAGGED_ELEMENT.FILTER;
        },
    },
};
</script>
