/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Components = {
    ConditionsVerticalTab: () => import('@Conditions/components/VerticalTabs/ConditionsVerticalTab').then(m => m.default || m),
};

export const Icons = {
    IconCategory: () => import('@Conditions/components/Icons/IconCategory').then(m => m.default || m),
};
