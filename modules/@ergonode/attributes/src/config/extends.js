/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
    Icons,
} from './imports';

export default {
    dictionaries: [
        {
            stateProp: 'attrTypes',
            dataFormat: {},
            requestPath: '/dictionary/attributes/types',
        },
    ],
    extendMethods: {
        '@Attributes/defaults/attributes': ({
            state,
        }) => ({
            DATE: {
                params: {
                    structure: 'object',
                    key: 'format',
                    value: state.dictionaries.dateFormats,
                },
                icon: Icons.IconDate,
            },
            UNIT: {
                params: {
                    structure: 'object',
                    key: 'unit',
                    value: state.dictionaries.units,
                },
                icon: Icons.IconUnit,
            },
            PRICE: {
                params: {
                    structure: 'object',
                    key: 'currency',
                    value: state.dictionaries.currencies,
                },
                icon: Icons.IconPrice,
            },
            TEXT_AREA: {
                params: {
                    structure: 'boolean',
                    key: 'richEdit',
                },
                hasPlaceholder: true,
                icon: Icons.IconTextArea,
            },
            TEXT: {
                hasPlaceholder: true,
                icon: Icons.IconText,
            },
            NUMERIC: {
                hasPlaceholder: true,
                icon: Icons.Numeric,
            },
            SELECT: {
                hasOptions: true,
                icon: Icons.IconSelect,
            },
            MULTI_SELECT: {
                hasOptions: true,
                icon: Icons.IconMultiSelect,
            },
            IMAGE: {
                icon: Icons.IconImage,
            },
            GALLERY: {
                icon: null,
            },
            FILE: {
                icon: null,
            },
        }),
    },
    extendComponents: {
        '@Attributes/components/Forms/AttributeForm': {
            DATE: {
                component: Components.AttributeFormParamsSelect,
            },
            UNIT: {
                component: Components.AttributeFormParamsSelect,
            },
            PRICE: {
                component: Components.AttributeFormParamsSelect,
            },
            TEXT_AREA: {
                component: Components.AttributeFormParamsToggle,
            },
        },
    },
};
