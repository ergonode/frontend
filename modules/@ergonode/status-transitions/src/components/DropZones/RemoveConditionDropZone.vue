/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <DropZone
            v-show="isDropZoneVisible"
            :hover-background-color="graphiteLightColor"
            :title="$t('@Transitions.transition.components.RemoveConditionDropZone.title')">
            <template #icon="{ color }">
                <IconRemoveFilter :fill-color="color" />
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
import IconRemoveFilter from '@UI/components/Icons/Actions/IconRemoveFilter';
import FadeTransition from '@UI/components/Transitions/FadeTransition';
import {
    mapState,
} from 'vuex';

export default {
    name: 'RemoveConditionDropZone',
    components: {
        IconRemoveFilter,
        DropZone,
        FadeTransition,
    },
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
        ]),
        isDropZoneVisible() {
            return this.isElementDragging === DRAGGED_ELEMENT.TEMPLATE;
        },
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
    },
};
</script>
