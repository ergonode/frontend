/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <UpdateWorkflowTransitionFab
            :transition-id="elementId" />
        <RemoveWorkflowTransitionFab
            @remove-transition="onRemoveTransition" />
    </div>
</template>
<script>
import RemoveWorkflowTransitionFab
    from '@Workflow/components/Buttons/RemoveWorkflowTransitionFab';
import UpdateWorkflowTransitionFab
    from '@Workflow/components/Buttons/UpdateWorkflowTransitionFab';

export default {
    name: 'WorkflowDesignerLayoutArrow',
    components: {
        UpdateWorkflowTransitionFab,
        RemoveWorkflowTransitionFab,
    },
    props: {
        elementId: {
            type: String,
            required: true,
        },
        isHovered: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'workflow-designer-layout-arrow-actions',
                {
                    'workflow-designer-layout-arrow-actions--hovered': this.isHovered,
                },
            ];
        },
    },
    methods: {
        onRemoveTransition() {
            this.$emit('remove-transition', this.elementId);
        },
    },
};
</script>

<style lang="scss" scoped>
    .workflow-designer-layout-arrow-actions {
        position: relative;
        top: -12px;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 12px;
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        will-change: opacity;
        opacity: 0;

        &--hovered {
            opacity: 1;
        }
    }
</style>
