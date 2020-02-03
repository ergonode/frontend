/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { UNASSIGNED_GROUP_ID } from '@Core/defaults/list';

export function getMappedGroupsElementsCount(elements) {
    const groupsElementsCount = {};
    const { length } = elements;

    for (let i = 0; i < length; i += 1) {
        const { groups } = elements[i];
        const { length: groupsCount } = groups;

        if (groupsCount === 0) {
            if (typeof groupsElementsCount[UNASSIGNED_GROUP_ID] === 'undefined') {
                groupsElementsCount[UNASSIGNED_GROUP_ID] = 1;
            } else {
                groupsElementsCount[UNASSIGNED_GROUP_ID] += 1;
            }
        } else {
            for (let j = 0; j < groupsCount; j += 1) {
                if (typeof groupsElementsCount[groups[j]] === 'undefined') {
                    groupsElementsCount[groups[j]] = 1;
                } else {
                    groupsElementsCount[groups[j]] += 1;
                }
            }
        }
    }

    return groupsElementsCount;
}
