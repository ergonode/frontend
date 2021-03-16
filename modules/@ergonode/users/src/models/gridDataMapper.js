/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
            const value = isObject(selectedData) ? Boolean(selectedData[types[type]]) : false;

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

    rows.sort((a, b) => {
        if (a.name.value < b.name.value) return -1;

        return a.name.value > b.name.value ? 1 : 0;
    });

    return {
        rows,
        columns,
    };
}
