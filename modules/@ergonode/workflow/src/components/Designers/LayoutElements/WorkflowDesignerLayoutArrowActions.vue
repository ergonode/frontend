/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <UpdateWorkflowTransitionFab
            v-if="!hasChange"
            :transition-id="elementId" />
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
    mapState,
} from 'vuex';

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
        ...mapState('feedback', [
            'errors',
            'changeValues',
        ]),
        hasChange() {
            const changeValuesKeys = Object.keys(this.changeValues);
            const hasChange = changeValuesKeys.length > 0
                && changeValuesKeys.some(key => Object.keys(this.changeValues[key]).length > 0
                    && !this.changeValues[key].saved);

            return hasChange;
        },
        extendedArrowAction() {
            return this.$getExtendSlot('@Workflow/components/Designer/WorkflowDesignerLayoutArrow/arrowActions');
        },
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
