/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { UNASSIGNED_GROUP_ID } from '@Core/defaults/list';
import { getMappedGroupItemsCount } from '@Core/models/mappers/listMapper';

describe('listMapper/getMappedGroupItemsCount', () => {
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

            expect(getMappedGroupItemsCount(elements)).toStrictEqual(result);
        });
    });
});
