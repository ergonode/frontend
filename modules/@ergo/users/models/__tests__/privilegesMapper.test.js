/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { getMappedGridData, getMappedPrivilegesBasedOnGridData } from '../privilegesMapper';

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
        const userRolePrivileges = {
            IMPORT_CREATE: true,
            IMPORT_READ: true,
            IMPORT_UPDATE: true,
            IMPORT_DELETE: true,
            CATEGORY_TREE_CREATE: true,
            CATEGORY_TREE_READ: true,
            CATEGORY_TREE_UPDATE: true,
            CATEGORY_TREE_DELETE: true,
            CATEGORY_CREATE: true,
            CATEGORY_READ: true,
            CATEGORY_UPDATE: true,
            CATEGORY_DELETE: true,
            PRODUCT_CREATE: true,
            PRODUCT_READ: true,
            PRODUCT_UPDATE: true,
            PRODUCT_DELETE: true,
            ATTRIBUTE_CREATE: true,
            ATTRIBUTE_READ: true,
            ATTRIBUTE_UPDATE: true,
            ATTRIBUTE_DELETE: true,
            ATTRIBUTE_GROUP_CREATE: true,
            ATTRIBUTE_GROUP_READ: true,
            ATTRIBUTE_GROUP_UPDATE: true,
            ATTRIBUTE_GROUP_DELETE: true,
            TEMPLATE_DESIGNER_CREATE: true,
            TEMPLATE_DESIGNER_READ: true,
            TEMPLATE_DESIGNER_UPDATE: true,
            TEMPLATE_DESIGNER_DELETE: true,
            MULTIMEDIA_CREATE: true,
            MULTIMEDIA_READ: true,
            MULTIMEDIA_UPDATE: true,
            MULTIMEDIA_DELETE: true,
            USER_ROLE_CREATE: true,
            USER_ROLE_READ: true,
            USER_ROLE_UPDATE: true,
            USER_ROLE_DELETE: true,
            USER_CREATE: true,
            USER_READ: true,
            USER_UPDATE: true,
            USER_DELETE: true,
        };
        const { rows, columns } = getMappedGridData(privilegesDic, userRolePrivileges);

        expect(rows.length).toBe(2);
        expect(columns.length).toBe(5);

        const expectedRows = [
            {
                id: { value: 0 },
                name: { value: 'User role' },
                read: { value: true },
                create: { value: true },
                update: { value: true },
                delete: { value: true },
            },
            {
                id: { value: 1 },
                name: { value: 'User' },
                read: { value: true },
                create: { value: true },
                update: { value: true },
                delete: { value: true },
            },
        ];
        const expectedColumns = [
            {
                id: 'name', label: '', type: 'TEXT', width: '1fr', editable: false, visible: true,
            },
            {
                id: 'create', label: 'Create', type: 'CHECK_CELL', width: '1fr', editable: true, visible: true,
            },
            {
                id: 'read', label: 'Read', type: 'CHECK_CELL', width: '1fr', editable: true, visible: true,
            },
            {
                id: 'update', label: 'Update', type: 'CHECK_CELL', width: '1fr', editable: true, visible: true,
            },
            {
                id: 'delete', label: 'Delete', type: 'CHECK_CELL', width: '1fr', editable: true, visible: true,
            },
        ];

        expect(rows).toStrictEqual(expectedRows);
        expect(columns).toStrictEqual(expectedColumns);
    });

    it('Based on Grid data, data is mapped into API structure', () => {
        const gridData = {
            0: {
                name: { editValue: 'User', presentationValue: 'User' },
                create: { editValue: true },
                read: { editValue: true },
                update: { editValue: true },
                delete: { editValue: true },
            },
            1: {
                name: { editValue: 'User role', presentationValue: 'User role' },
                create: { editValue: true },
                read: { editValue: true },
                update: { editValue: true },
                delete: { editValue: true },
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
