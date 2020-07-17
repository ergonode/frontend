/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    STATE,
} from '@Core/defaults/inputs/checkbox';
import {
    isObject,
} from '@Core/models/objectWrapper';

export function getMappedRestrictions(data) {
    if (!isObject(data)) return null;

    return Object.keys(data).reduce((acc, languageKey) => {
        const response = acc;
        const restriction = Object.keys(data[languageKey]);

        for (let i = 0; i < restriction.length; i += 1) {
            if (data[languageKey][restriction[i]]) {
                response[`${languageKey}_${restriction[i].toUpperCase()}`] = true;
            }
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
    const rows = [];
    const columns = [];

    if (isEditable) {
        columns.push(defaults.selectRowColumn);
    }

    columns.push(defaults.nameColumn);

    const tmpPrivilegeColumns = {};

    for (let i = 0; i < fullDataList.length; i += 1) {
        const {
            [defaults.dataStructure.name]: name,
            [defaults.dataStructure.description]: description,
            [defaults.dataStructure.types]: types,
        } = fullDataList[i];

        const optionTypes = Object.keys(types);
        const mappedId = types[optionTypes[0]].split('_');
        mappedId.pop();

        const row = {
            id: {
                value: mappedId.join('_'),
            },
            name: {
                value: name,
                hint: description,
            },
        };

        for (let j = 0; j < optionTypes.length; j += 1) {
            const type = optionTypes[j];

            if (!tmpPrivilegeColumns[type]) {
                tmpPrivilegeColumns[type] = true;
                columns.push(defaults.getCheckColumn(type, isEditable));
            }
            const value = isObject(selectedData) ? selectedData[types[type]] : false;

            row[type] = {
                value,
            };
        }

        if (isEditable) {
            if (optionTypes.every(type => row[type].value)) {
                row.selectRow = {
                    value: STATE.CHECK,
                };
            } else if (optionTypes.every(type => !row[type].value)) {
                row.selectRow = {
                    value: STATE.UNCHECK,
                };
            } else {
                row.selectRow = {
                    value: STATE.CHECK_ANY,
                };
            }
        }

        rows.push(row);
    }

    return {
        rows,
        columns,
    };
}

export function getMappedPrivilegesBasedOnGridData({
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
            const mappedPrivilege = `${privilegeName}_${type.toUpperCase()}`;

            if (!selectedData[mappedPrivilege] && drafts[privilegeName][type]) {
                mappedPrivileges.push(mappedPrivilege);
            } else if (!drafts[privilegeName][type]) {
                mappedPrivileges = mappedPrivileges.filter(priv => priv !== mappedPrivilege);
            }
        }
    }

    return mappedPrivileges;
}
