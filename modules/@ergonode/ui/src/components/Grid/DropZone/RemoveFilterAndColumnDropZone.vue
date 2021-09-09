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
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    GRAPHITE_LIGHT,
} from '@UI/assets/scss/_js-variables/colors.scss';
import DropZone from '@UI/components/DropZone/DropZone';
import IconRemoveColumn from '@UI/components/Icons/Actions/IconRemoveColumn';
import IconRemoveFilter from '@UI/components/Icons/Actions/IconRemoveFilter';
import FadeTransition from '@UI/components/Transitions/FadeTransition';
import {
    mapState,
} from 'vuex';

export default {
    name: 'RemoveFilterAndColumnDropZone',
    components: {
        DropZone,
        FadeTransition,
    },
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
            if (
                (this.draggedInScope !== this.scope)
                || (this.draggedElement && typeof this.draggedElement.deletable !== 'undefined' && !this.draggedElement.deletable)) {
                return false;
            }

            return this.isElementDragging === DRAGGED_ELEMENT.COLUMN
                || this.isElementDragging === DRAGGED_ELEMENT.FILTER;
        },
    },
};
</script>
