/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { STATE } from '@Core/defaults/inputs/checkbox';

export function getMappedRestrictions(data) {
    return Object.keys(data).reduce((acc, restriction) => {
        const response = acc;

        for (let i = 0; i < data[restriction].length; i += 1) {
            response[`${data[restriction][i]}_${restriction.toUpperCase()}`] = true;
        }
        return response;
    }, {});
}

export function getMappedGridData({
    fullDataList,
    selectedData,
    defaults,
    isEditable = false,
}) {
    const data = {};
    const columns = [];

    if (isEditable) {
        data.selectRow = [];
        columns.push(defaults.selectRowColumn);
    }

    data.name = [];
    data.id = [];
    columns.push(defaults.nameColumn);

    for (let i = 0; i < fullDataList.length; i += 1) {
        const {
            [defaults.dataStructure.name]: name,
            [defaults.dataStructure.description]: description,
            [defaults.dataStructure.types]: types,
        } = fullDataList[i];

        data.name.push({
            value: name,
            hint: description,
        });
        data.id.push(name);

        const optionTypes = Object.keys(types);

        for (let j = 0; j < optionTypes.length; j += 1) {
            const type = optionTypes[j];

            if (!data[type]) {
                data[type] = [];
                columns.push(defaults.getCheckColumn(type, isEditable));
            }
            const value = selectedData[types[type]] || false;

            data[type].push({ value });
        }

        if (data.selectRow) {
            if (optionTypes.every(type => data[type][i].value)) {
                data.selectRow.push({ value: STATE.CHECK });
            } else if (optionTypes.every(type => !data[type][i].value)) {
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

export function getMappedDataBasedOnGridData({
    selectedData,
    drafts,
}) {
    const privilegeNames = Object.keys(drafts);
    let mappedPrivileges = Object.keys(selectedData);

    for (let i = 0; i < privilegeNames.length; i += 1) {
        const privilegeName = privilegeNames[i];
        const privilegeRole = drafts[privilegeName];
        const privilegeTypes = Object.keys(privilegeRole);

        for (let j = 0; j < privilegeTypes.length; j += 1) {
            const type = privilegeTypes[j];
            const capitalizedPrivilegeName = privilegeName
                .split(' ')
                .map(name => name.toUpperCase())
                .join('_');
            const mappedPrivilege = `${capitalizedPrivilegeName}_${type.toUpperCase()}`;

            if (!selectedData[mappedPrivilege] && drafts[privilegeName][type]) {
                mappedPrivileges.push(mappedPrivilege);
            } else {
                mappedPrivileges = mappedPrivileges.filter(priv => priv !== mappedPrivilege);
            }
        }
    }

    return mappedPrivileges;
}
