/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <NuxtLink
            v-if="isSaved"
            data-cy="transition-action-edit"
            :to="linkTo">
            <UpdateWorkflowTransitionFab />
        </NuxtLink>
        <UpdateWorkflowTransitionFab
            v-else
            data-cy="transition-action-edit"
            @click.native="onSubmitTransition"
        />
        <RemoveWorkflowTransitionFab
            @remove-transition="onRemoveTransition" />
        <template
            v-for="(actionItem, index) in extendedArrowAction">
            <Component
                :is="actionItem.component"
                :key="index"
                v-bind="bindingProps(actionItem)" />
        </template>
    </div>
</template>
<script>
import RemoveWorkflowTransitionFab
    from '@Workflow/components/Buttons/RemoveWorkflowTransitionFab';
import UpdateWorkflowTransitionFab
    from '@Workflow/components/Buttons/UpdateWorkflowTransitionFab';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    ROUTE_NAME,
} from '@Workflow/config/routes';
import {
    mapState,
} from 'vuex';

export default {
    name: 'WorkflowDesignerLayoutArrowActions',
    components: {
        UpdateWorkflowTransitionFab,
        RemoveWorkflowTransitionFab,
    },
    props: {
        elementId: {
            type: String,
            required: true,
        },
        isSaved: {
            type: Boolean,
            default: false,
        },
        isHovered: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('workflow', [
            'transitions',
        ]),
        classes() {
            return [
                'workflow-designer-layout-arrow-actions',
                {
                    'workflow-designer-layout-arrow-actions--hovered': this.isHovered,
                },
            ];
        },
        linkTo() {
            return {
                name: ROUTE_NAME.WORKFLOW_TRANSITION_EDIT_GENERAL,
                params: {
                    id: this.elementId,
                    workflowId: this.$route.params.workflowId,
                },
            };
        },
        extendedArrowAction() {
            return this.$getExtendSlot('@Workflow/components/Designer/WorkflowDesignerLayoutArrow/arrowActions');
        },
    },
    methods: {
        onRemoveTransition() {
            this.$emit('remove-transition', this.elementId);
        },
        onSubmitTransition() {
            this.$emit('submit-transition', this.elementId);
        },
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.WORKFLOW,
                hasChange: this.hasChange,
                ...props,
            };
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
