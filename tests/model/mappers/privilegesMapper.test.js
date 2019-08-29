/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { getMappedGridData, getMappedPrivilegesBasedOnGridData } from '~/model/mappers/privilegesMapper';

describe('privilegesMapper/getMappedGridData', () => {
    it('Based on API output data is mapped into Grid structure', () => {
        const privilegesDic = [
            {
                name: 'User role',
                privileges: {
                    create: 'USER_ROLE_CREATE',
                    read: 'USER_ROLE_READ',
                    update: 'USER_ROLE_UPDATE',
                    delete: 'USER_ROLE_DELETE',
                },
            },
            {
                name: 'User',
                privileges: {
                    create: 'USER_CREATE',
                    read: 'USER_READ',
                    update: 'USER_UPDATE',
                    delete: 'USER_DELETE',
                },
            },
        ];
        const userRolePrivileges = [
            'IMPORT_CREATE',
            'IMPORT_READ',
            'IMPORT_UPDATE',
            'IMPORT_DELETE',
            'CATEGORY_TREE_CREATE',
            'CATEGORY_TREE_READ',
            'CATEGORY_TREE_UPDATE',
            'CATEGORY_TREE_DELETE',
            'CATEGORY_CREATE',
            'CATEGORY_READ',
            'CATEGORY_UPDATE',
            'CATEGORY_DELETE',
            'PRODUCT_CREATE',
            'PRODUCT_READ',
            'PRODUCT_UPDATE',
            'PRODUCT_DELETE',
            'ATTRIBUTE_CREATE',
            'ATTRIBUTE_READ',
            'ATTRIBUTE_UPDATE',
            'ATTRIBUTE_DELETE',
            'ATTRIBUTE_GROUP_CREATE',
            'ATTRIBUTE_GROUP_READ',
            'ATTRIBUTE_GROUP_UPDATE',
            'ATTRIBUTE_GROUP_DELETE',
            'TEMPLATE_DESIGNER_CREATE',
            'TEMPLATE_DESIGNER_READ',
            'TEMPLATE_DESIGNER_UPDATE',
            'TEMPLATE_DESIGNER_DELETE',
            'MULTIMEDIA_CREATE',
            'MULTIMEDIA_READ',
            'MULTIMEDIA_UPDATE',
            'MULTIMEDIA_DELETE',
            'USER_ROLE_CREATE',
            'USER_ROLE_READ',
            'USER_ROLE_UPDATE',
            'USER_ROLE_DELETE',
            'USER_CREATE',
            'USER_READ',
            'USER_UPDATE',
            'USER_DELETE',
        ];
        const { rows, columns } = getMappedGridData(privilegesDic, userRolePrivileges);

        expect(rows.length).toBe(2);
        expect(columns.length).toBe(5);

        const expectedRows = [
            {
                id: 0,
                name: 'User role',
                read: true,
                create: true,
                update: true,
                delete: true,
            },
            {
                id: 1,
                name: 'User',
                read: true,
                create: true,
                update: true,
                delete: true,
            },
        ];
        const expectedColumns = [
            { id: 'name', label: '', type: 'TEXT' },
            {
                id: 'create', label: 'Create', type: 'CHECK_CELL', width: '1fr', editable: true,
            },
            {
                id: 'read', label: 'Read', type: 'CHECK_CELL', width: '1fr', editable: true,
            },
            {
                id: 'update', label: 'Update', type: 'CHECK_CELL', width: '1fr', editable: true,
            },
            {
                id: 'delete', label: 'Delete', type: 'CHECK_CELL', width: '1fr', editable: true,
            },
        ];

        expect(rows).toStrictEqual(expectedRows);
        expect(columns).toStrictEqual(expectedColumns);
    });

    it('Based on Grid data, data is mapped into API structure', () => {
        const gridData = {
            0: {
                name: { value: 'User' },
                create: { value: true },
                read: { value: true },
                update: { value: true },
                delete: { value: true },
            },
            1: {
                name: { value: 'User role' },
                create: { value: true },
                read: { value: true },
                update: { value: true },
                delete: { value: true },
            },
        };
        const privilegesDic = [
            {
                name: 'User role',
                privileges: {
                    create: 'USER_ROLE_CREATE',
                    read: 'USER_ROLE_READ',
                    update: 'USER_ROLE_UPDATE',
                    delete: 'USER_ROLE_DELETE',
                },
            },
            {
                name: 'User',
                privileges: {
                    create: 'USER_CREATE',
                    read: 'USER_READ',
                    update: 'USER_UPDATE',
                    delete: 'USER_DELETE',
                },
            },
        ];
        const userRolePrivileges = [
            'USER_CREATE',
            'USER_READ',
            'USER_UPDATE',
            'USER_DELETE',
            'USER_ROLE_CREATE',
            'USER_ROLE_READ',
            'USER_ROLE_UPDATE',
            'USER_ROLE_DELETE',
        ];

        const mappedPrivileges = getMappedPrivilegesBasedOnGridData(privilegesDic, gridData);

        expect(mappedPrivileges.length).toBe(8);
        expect(mappedPrivileges).toStrictEqual(userRolePrivileges);
    });
});
