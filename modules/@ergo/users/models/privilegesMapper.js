/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { toCapitalize } from '@Core/models/stringWrapper';
import { STATE } from '@Core/defaults/inputs/checkbox';

const getCheckColumn = (privilegeType, isEditable) => ({
    id: privilegeType,
    label: toCapitalize(privilegeType),
    type: 'PRIVILEGE_CHECK',
    editable: isEditable,
    visible: true,
});

const nameColumn = {
    id: 'name',
    label: 'Name',
    type: 'PRIVILEGE_NAME',
    editable: false,
    visible: true,
};

const selectRowColumn = {
    id: 'selectRow',
    label: '',
    type: 'PRIVILEGE_SELECT_ROW',
    editable: true,
    visible: true,
};

export function getMappedGridData({
    systemPrivileges,
    rolePrivileges,
    isEditable = false,
}) {
    const data = {};
    const columns = [];

    if (isEditable) {
        data.selectRow = [];
        columns.push(selectRowColumn);
    }

    data.name = [];
    data.id = [];
    columns.push(nameColumn);

    for (let i = 0; i < systemPrivileges.length; i += 1) {
        const { name, description, privileges } = systemPrivileges[i];

        data.name.push({
            value: name,
            hint: description,
        });

        const privilegeTypes = Object.keys(privileges);
        const mappedId = privileges[privilegeTypes[0]].split('_');
        mappedId.pop();

        data.id.push(mappedId.join('_'));

        for (let j = 0; j < privilegeTypes.length; j += 1) {
            const type = privilegeTypes[j];

            if (!data[type]) {
                data[type] = [];
                columns.push(getCheckColumn(type, isEditable));
            }
            const value = rolePrivileges[privileges[type]] || false;

            data[type].push({ value });
        }

        if (data.selectRow) {
            if (privilegeTypes.every(type => data[type][i].value)) {
                data.selectRow.push({ value: STATE.CHECK });
            } else if (privilegeTypes.every(type => !data[type][i].value)) {
                data.selectRow.push({ value: STATE.UNCHECK });
            } else {
                data.selectRow.push({ value: STATE.CHECK_ANY });
            }
        }
    }

    return {
        data,
        columns,
    };
}

export function getMappedPrivilegesBasedOnGridData({
    rolePrivileges,
    drafts,
}) {
    const privilegeNames = Object.keys(drafts);
    let mappedPrivileges = Object.keys(rolePrivileges);

    for (let i = 0; i < privilegeNames.length; i += 1) {
        const privilegeName = privilegeNames[i];
        const privilegeRole = drafts[privilegeName];
        const privilegeTypes = Object.keys(privilegeRole);

        for (let j = 0; j < privilegeTypes.length; j += 1) {
            const type = privilegeTypes[j];
            const mappedPrivilege = `${privilegeName}_${type.toUpperCase()}`;

            if (!rolePrivileges[mappedPrivilege] && drafts[privilegeName][type]) {
                mappedPrivileges.push(mappedPrivilege);
            } else if (!drafts[privilegeName][type]) {
                mappedPrivileges = mappedPrivileges.filter(priv => priv !== mappedPrivilege);
            }
        }
    }

    return mappedPrivileges;
}
