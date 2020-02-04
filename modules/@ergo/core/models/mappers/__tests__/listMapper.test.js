/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { UNASSIGNED_GROUP_ID } from '@Core/defaults/list';
import {
    getMappedGroupsElementsCount,
} from '../listMapper';

describe('attributeMapper/getMappedGroupsElementsCount', () => {
    describe('Based on API data, data is mapped into data structure', () => {
        it('Counting elements for each group', () => {
            const allGroups = ['first', 'second'];
            const oneGroup = ['first'];
            const noneGroup = [];
            const elements = [
                {
                    groups: allGroups,
                },
                {
                    groups: oneGroup,
                },
                {
                    groups: allGroups,
                },
                {
                    groups: noneGroup,
                },
                {
                    groups: noneGroup,
                },
                {
                    groups: noneGroup,
                },
            ];
            const result = {
                first: 3,
                second: 2,
                [UNASSIGNED_GROUP_ID]: 3,
            };

            expect(getMappedGroupsElementsCount(elements)).toStrictEqual(result);
        });
    });
});
