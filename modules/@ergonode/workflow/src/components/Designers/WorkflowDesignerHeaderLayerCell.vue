/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <WorkflowDesignerDraggableColumnLayer
        :scope="scope"
        :index="index"
        :column="status"
        @swap="onSwapColumns">
        <div
            :class="classes"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave">
            <WorkflowStatusBadge
                :color="status.color"
                :default-status="status.is_default" />
            <span
                class="workflow-designer-header-layer-cell__title"
                v-text="title" />
            <WorkflowDesignerEditStatusLink
                v-if="isAllowedToUpdate"
                data-cy="status-column-edit"
                :status-id="status.id"
                :visible="isHovered" />
        </div>
    </WorkflowDesignerDraggableColumnLayer>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import WorkflowStatusBadge from '@Workflow/components/Badges/WorkflowStatusBadge';
import WorkflowDesignerDraggableColumnLayer
    from '@Workflow/components/Designers/WorkflowDesignerDraggableColumnLayer';
import WorkflowDesignerEditStatusLink
    from '@Workflow/components/Designers/WorkflowDesignerEditStatusLink';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    mapState,
} from 'vuex';

export default {
    name: 'WorkflowDesignerHeaderLayerCell',
    components: {
        WorkflowDesignerDraggableColumnLayer,
        WorkflowStatusBadge,
        WorkflowDesignerEditStatusLink,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        index: {
            type: Number,
            required: true,
        },
        status: {
            type: Object,
            required: true,
        },
        hasRightBorder: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        ...mapState('draggable', [
            'draggedElement',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]);
        },
        isDragged() {
            return this.draggedElement && this.draggedElement.id === this.status.id;
        },
        classes() {
            return [
                'workflow-designer-header-layer-cell',
                {
                    'workflow-designer-header-layer-cell--ghost': this.isDragged,
                    'workflow-designer-header-layer-cell--right-border': this.hasRightBorder,
                },
            ];
        },
        title() {
            return this.status.name || `#${this.status.code}`;
        },
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onMouseEnter() {
            this.isHovered = true;
        },
        onMouseLeave() {
            this.isHovered = false;
        },
        onSwapColumns(payload) {
            this.$emit('swap', payload);
        },
    },
};
</script>

<style lang="scss" scoped>
    .workflow-designer-header-layer-cell {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 8px 0 4px;
        background-color: $WHITESMOKE;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
        border-left: $BORDER_DASHED_GREY;
        border-top: $BORDER_DASHED_GREY;
        cursor: grab;

        &--right-border {
            border-right: $BORDER_DASHED_GREY;
        }

        &--ghost {
            background-color: $GREEN;
            box-shadow: $ELEVATOR_HOLE;
            color: $WHITE;
        }

        &__title {
            flex: 1;
            width: 0;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
</style>
