/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
    Icons,
} from '@Conditions/config/imports';

export default {
    extendMethods: {
        '@Transitions/components/Tabs/ConditionDesignerTab/verticalTabs': ({
            $this,
            props,
        }) => [
            {
                title: $this.$t('@Conditions.transitionExtend.methods.verticalTabTitle'),
                component: Components.ConditionsVerticalTab,
                icon: Icons.IconCategory,
                props: {
                    group: 'workflow',
                    ...props,
                },
            },
        ],
    },
};
