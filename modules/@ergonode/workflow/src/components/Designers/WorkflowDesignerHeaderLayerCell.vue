/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <div class="workflow-designer-header-layer-cell__title">
            <WorkflowStatusBadge
                :color="status.color"
                :default="status.is_default" />
            {{ title }}
        </div>
        <WorkflowDesignerEditStatusLink :status-id="status.id" />
    </div>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import WorkflowStatusBadge from '@Modules/@ergonode/workflow/src/components/Badges/WorkflowStatusBadge';
import WorkflowDesignerEditStatusLink
    from '@Modules/@ergonode/workflow/src/components/Designers/WorkflowDesignerEditStatusLink';

export default {
    name: 'WorkflowDesignerHeaderLayerCell',
    components: {
        WorkflowStatusBadge,
        WorkflowDesignerEditStatusLink,
    },
    props: {
        status: {
            type: Object,
            required: true,
        },
        hasRightBorder: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'workflow-designer-header-layer-cell',
                {
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
};
</script>

<style lang="scss" scoped>
    .workflow-designer-header-layer-cell {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2px 0 12px;
        background-color: $WHITESMOKE;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
        border-left: $BORDER_DASHED_GREY;
        border-top: $BORDER_DASHED_GREY;

        &--right-border {
            border-right: $BORDER_DASHED_GREY;
        }

        &__title {
            display: flex;
            align-items: center;
            column-gap: 8px;
        }
    }
</style>
