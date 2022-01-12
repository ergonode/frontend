/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
    Icons,
} from '@Workflow/config/imports';

export default {
    extendMethods: {
        '@Workflow/components/Tabs/WorkflowTransitionConditionDesignerTab/verticalTabs': ({
            $this,
            props,
        }) => [
            {
                title: $this.$t('@Workflow.workflow.components.ConditionsVerticalTab.title'),
                component: Components.ConditionsVerticalTab,
                icon: Icons.Category,
                props: {
                    scope: $this.scope,
                    ...props,
                },
            },
        ],
        '@Transitions/components/Tabs/ConditionDesignerTab/verticalTabs': ({
            $this,
            props,
        }) => [
            {
                title: $this.$t('@Workflow.workflow.components.ConditionsVerticalTab.title'),
                component: Components.ConditionsVerticalTab,
                icon: Icons.Category,
                props: {
                    scope: $this.scope,
                    ...props,
                },
            },
        ],
    },
};
