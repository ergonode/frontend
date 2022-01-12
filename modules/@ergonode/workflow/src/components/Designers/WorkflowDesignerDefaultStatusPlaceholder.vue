/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="workflow-designer-default-status-placeholder">
        <img
            class="workflow-designer-default-status-placeholder__arrow"
            :src="arrowUrl"
            alt="Right arrow illustration">
        <div class="workflow-designer-default-status-placeholder__container">
            <Placeholder
                :orientation="horizontalOrientation"
                :title="$t('@Workflow.workflow.components.WorkflowDesignerDefaultStatusPlaceholder.title')"
                :subtitle="$t('@Workflow.workflow.components.WorkflowDesignerDefaultStatusPlaceholder.subtitle')">
                <template #action>
                    <CreateWorkflowStatusButton />
                </template>
            </Placeholder>
        </div>
    </div>
</template>

<script>
import {
    ORIENTATION,
} from '@Core/defaults/layout';
import CreateWorkflowStatusButton from '@Workflow/components/Buttons/CreateWorkflowStatusButton';

export default {
    name: 'WorkflowDesignerDefaultStatusPlaceholder',
    components: {
        CreateWorkflowStatusButton,
    },
    computed: {
        arrowUrl() {
            return require('@UI/assets/images/placeholders/right_arrow.svg');
        },
        horizontalOrientation() {
            return ORIENTATION.HORIZONTAL;
        },
    },
};
</script>

<style lang="scss" scoped>
    .workflow-designer-default-status-placeholder {
        position: relative;
        display: flex;
        flex: 1 1 100%;
        flex-direction: column;
        align-items: flex-end;

        &__container {
            padding-top: 40px;
        }

        &__arrow {
            position: absolute;
            top: 12px;
            right: 32px;
        }
    }
</style>
