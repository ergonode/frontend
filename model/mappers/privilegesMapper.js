/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { toCapitalize } from '~/model/stringWrapper';

export function getMappedGridData(privileges, rolePrivileges) {
    const rows = [];
    const columns = [
        {
            id: 'name',
            label: '',
            type: 'TEXT',
        },
    ];
    const tmpRowKeys = {};
    const tmpColumnKeys = {};
    const { length: rolePrivilegesNumber } = rolePrivileges;
    const systemPrivilegesEntries = Object.entries(privileges);
    const { length: systemPrivilegesLength } = systemPrivilegesEntries;
    let rowIndex = 0;

    for (let i = 0; i < rolePrivilegesNumber; i += 1) {
        const rolePrivilege = rolePrivileges[i];
        const rolePrivilegeName = rolePrivilege.split('_');
        console.log(rolePrivilege);
        const rolePrivilegeType = rolePrivilegeName[rolePrivilegeName.length - 1].toLowerCase();

        if (!tmpColumnKeys[rolePrivilegeType]) {
            columns.push(
                {
                    id: rolePrivilegeType,
                    label: toCapitalize(rolePrivilegeType),
                    type: 'CHECK_CELL',
                    width: '1fr',
                    editable: true,
                },
            );
            tmpColumnKeys[rolePrivilegeType] = '+';
        }

        for (let j = 0; j < systemPrivilegesLength; j += 1) {
            const [, entry] = systemPrivilegesEntries[j];
            const { name, privileges: systemPrivileges } = entry;
            const values = Object.values(systemPrivileges);
            const { length: valuesNumber } = values;

            for (let k = 0; k < valuesNumber; k += 1) {
                if (values[k] === rolePrivilege) {
                    console.log(name, rolePrivilege);
                    if (!tmpRowKeys[name]) {
                        tmpRowKeys[name] = '+';
                        rows.push({
                            id: rowIndex,
                            name,
                        });
                        rowIndex += 1;
                    }

                    rows[rowIndex - 1][rolePrivilegeType] = true;
                }
            }
        }
    }

    return {
        rows,
        columns,
    };
}

export function getMappedPrivilegesBasedOnGridData(privileges, gridData) {
    const rows = Object.entries(gridData);
    const { length: rowsNumber } = rows;
    const mappedPrivileges = [];

    for (let i = 0; i < rowsNumber; i += 1) {
        const [, role] = rows[i];
        const privilegeKeys = Object.keys(role);
        const { length: privilegesKeysNumber } = privilegeKeys;

        for (let j = 0; j < privilegesKeysNumber; j += 1) {
            if (privilegeKeys[j] !== 'name') {
                const privilegeName = `${role.name.replace(' ', '_').toUpperCase()}_${privilegeKeys[j].toUpperCase()}`;

                if (role[privilegeKeys[j]]) {
                    mappedPrivileges.push(privilegeName);
                }
            }
        }
    }

    return mappedPrivileges;
}
