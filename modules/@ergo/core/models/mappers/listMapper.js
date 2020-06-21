/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    UNASSIGNED_GROUP_ID,
} from '@Core/defaults/list';

export function getMappedGroupItemsCount(items) {
    const groupItemsCount = {
    };
    const {
        length,
    } = items;

    for (let i = 0; i < length; i += 1) {
        const {
            groups,
        } = items[i];
        const {
            length: groupsCount,
        } = groups;

        if (groupsCount === 0) {
            if (typeof groupItemsCount[UNASSIGNED_GROUP_ID] === 'undefined') {
                groupItemsCount[UNASSIGNED_GROUP_ID] = 1;
            } else {
                groupItemsCount[UNASSIGNED_GROUP_ID] += 1;
            }
        } else {
            for (let j = 0; j < groupsCount; j += 1) {
                if (typeof groupItemsCount[groups[j]] === 'undefined') {
                    groupItemsCount[groups[j]] = 1;
                } else {
                    groupItemsCount[groups[j]] += 1;
                }
            }
        }
    }

    return groupItemsCount;
}
