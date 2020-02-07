/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { toCapitalize } from '@Core/models/stringWrapper';
import { COLUMN_TYPE } from '@Core/defaults/grid';

const getCheckColumn = privilegeType => ({
    id: privilegeType,
    label: toCapitalize(privilegeType),
    type: COLUMN_TYPE.CHECK_CELL,
    width: '1fr',
    editable: true,
    visible: true,
});

const getNameColumn = () => ({
    id: 'name',
    label: '',
    type: COLUMN_TYPE.TEXT,
    width: '1fr',
    editable: false,
    visible: true,
});

export function getMappedGridData(privileges, rolePrivileges) {
    const rows = [];
    const columns = [
        getNameColumn(),
    ];
    const columnWidths = ['1fr'];
    const tmpRowKeys = {};
    const tmpColumnKeys = {};
    const systemPrivilegesEntries = Object.entries(privileges);
    const { length: systemPrivilegesLength } = systemPrivilegesEntries;
    const descriptions = {};
    let rowIndex = 0;

    for (let i = 0; i < systemPrivilegesLength; i += 1) {
        const [, entry] = systemPrivilegesEntries[i];
        const { name, privileges: systemPrivileges, description } = entry;
        const privilegeNames = Object.values(systemPrivileges);
        const { length: privilegeNamesNumber } = privilegeNames;

        if (!tmpRowKeys[name]) {
            tmpRowKeys[name] = '+';
            rows.push({
                id: { value: rowIndex },
                name: { value: name },
            });
            descriptions[rowIndex] = description;
            rowIndex += 1;
        }

        for (let j = 0; j < privilegeNamesNumber; j += 1) {
            const rolePrivilege = privilegeNames[j];
            const rolePrivilegeName = rolePrivilege.split('_');
            const rolePrivilegeType = rolePrivilegeName[rolePrivilegeName.length - 1].toLowerCase();

            if (!tmpColumnKeys[rolePrivilegeType]) {
                columns.push(getCheckColumn(rolePrivilegeType));
                columnWidths.push('1fr');
                tmpColumnKeys[rolePrivilegeType] = '+';
            }

            rows[rowIndex - 1][rolePrivilegeType] = {
                value: Boolean(rolePrivileges[rolePrivilege]),
            };
        }
    }

    return {
        rows,
        columns,
        descriptions,
        columnWidths,
    };
}

export function getMappedPrivilegesBasedOnGridData(privilegesDic, gridData) {
    const tmpPrivilegesDic = [...privilegesDic];
    const rows = Object.entries(gridData);
    const { length: rowsNumber } = rows;
    const mappedPrivileges = [];

    for (let i = 0; i < rowsNumber; i += 1) {
        const [, role] = rows[i];
        const privilegeKeys = Object.keys(role);
        const { length: privilegesKeysNumber } = privilegeKeys;
        const privilegeIndex = tmpPrivilegesDic.findIndex(
            privilege => privilege.name === role.name.presentationValue,
        );

        if (privilegeIndex > -1) {
            for (let j = 0; j < privilegesKeysNumber; j += 1) {
                if (privilegeKeys[j] !== 'name' && role[privilegeKeys[j]].editValue) {
                    const privilegeName = tmpPrivilegesDic[privilegeIndex]
                        .privileges[privilegeKeys[j]];

                    mappedPrivileges.push(privilegeName);
                }
            }

            tmpPrivilegesDic.splice(privilegeIndex, 1);
        }
    }

    return mappedPrivileges;
}
