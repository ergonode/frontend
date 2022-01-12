/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const CONDITION_TYPES = {
    NUMERIC_ATTRIBUTE_VALUE_CONDITION: 'NUMERIC_ATTRIBUTE_VALUE_CONDITION',
    OPTION_ATTRIBUTE_VALUE_CONDITION: 'OPTION_ATTRIBUTE_VALUE_CONDITION',
    USER_EXACTLY_CONDITION: 'USER_EXACTLY_CONDITION',
    PRODUCT_SKU_EXISTS_CONDITION: 'PRODUCT_SKU_EXISTS_CONDITION',
    PRODUCT_HAS_TEMPLATE_CONDITION: 'PRODUCT_HAS_TEMPLATE_CONDITION',
    PRODUCT_BELONG_CATEGORY_CONDITION: 'PRODUCT_BELONG_CATEGORY_CONDITION',
    ROLE_EXACTLY_CONDITION: 'ROLE_EXACTLY_CONDITION',
    PRODUCT_COMPLETENESS_CONDITION: 'PRODUCT_COMPLETENESS_CONDITION',
    LANGUAGE_COMPLETENESS_CONDITION: 'LANGUAGE_COMPLETENESS_CONDITION',
};

export const conditionSets = [
    {
        type: 'NUMERIC_ATTRIBUTE_VALUE_CONDITION',
        attribute: '8a67367b-3c43-5b2d-8b66-cc345d2b2d75',
        operator: '=',
        value: 123.0,
    },
    {
        type: 'OPTION_ATTRIBUTE_VALUE_CONDITION',
        attribute: 'e45ec75b-44e2-5dd2-a558-51ed3d0af06f',
        value: '93891763-7c4f-4c9f-a05d-b1fe6c3aa89e',
    },
    {
        type: 'USER_EXACTLY_CONDITION',
        user: '1d0d73c8-b5c2-5083-bbb1-f6740fa59a6d',
    },
    {
        type: 'PRODUCT_SKU_EXISTS_CONDITION',
        operator: '<>',
        value: '021',
    },
];

export const conditionSetsTree = [
    {
        row: 0,
        column: 0,
        parent: null,
    },
    {
        row: 1,
        column: 0,
        parent: null,
    },
    {
        row: 2,
        column: 0,
        parent: null,
    },
    {
        row: 3,
        column: 0,
        parent: null,
    },
];

export const tree = [
    {
        id: 'o86m58ot9',
        type: 'NUMERIC_ATTRIBUTE_VALUE_CONDITION',
        row: 0,
        column: 0,
        parent: null,
    },
    {
        id: 'm0szb2e1u',
        type: 'OPTION_ATTRIBUTE_VALUE_CONDITION',
        row: 1,
        column: 0,
        parent: null,
    },
    {
        id: 'xfugad5lp',
        type: 'LANGUAGE_COMPLETENESS_CONDITION',
        row: 2,
        column: 0,
        parent: null,
    },
    {
        id: 'jpwuri1c3',
        type: 'PRODUCT_COMPLETENESS_CONDITION',
        row: 3,
        column: 0,
        parent: null,
    },
    {
        id: 'nj37j126c',
        type: 'ROLE_EXACTLY_CONDITION',
        row: 4,
        column: 0,
        parent: null,
    },
    {
        id: 't71dqcshp',
        type: 'USER_EXACTLY_CONDITION',
        row: 5,
        column: 0,
        parent: null,
    },
    {
        id: 'grmrxg6qv',
        type: 'USER_EXACTLY_CONDITION',
        row: 6,
        column: 0,
        parent: null,
    },
    {
        id: '2wb82fyyk',
        type: 'PRODUCT_SKU_EXISTS_CONDITION',
        row: 7,
        column: 0,
        parent: null,
    },
    {
        id: 'd8x8uc5v6',
        type: 'PRODUCT_BELONG_CATEGORY_CONDITION',
        row: 8,
        column: 0,
        parent: null,
    },
    {
        id: 'n2sx029k4',
        type: 'PRODUCT_SKU_EXISTS_CONDITION',
        row: 9,
        column: 0,
        parent: null,
    },
    {
        id: 'j4luumpaq',
        type: 'PRODUCT_HAS_TEMPLATE_CONDITION',
        row: 10,
        column: 0,
        parent: null,
    },
];

export const conditions = {
    NUMERIC_ATTRIBUTE_VALUE_CONDITION: {
        type: 'NUMERIC_ATTRIBUTE_VALUE_CONDITION',
        name: 'Numeric attribute has value',
        phrase: 'Attribute [attribute] is [operator] [value]',
        parameters: [
            {
                name: 'attribute',
                type: 'SELECT',
                options: {
                    'a3dfa94d-43d3-5e28-94cd-2cad9cc89825': 'code_21',
                    '8a67367b-3c43-5b2d-8b66-cc345d2b2d75': 'code_22',
                    '38ea0370-5b8b-5eed-a028-02da8c6e6c44': 'code_23',
                    'da48add4-353d-5746-959b-0a75dd123e47': 'code_24',
                    '5fa23c00-0da7-5eb9-8005-c17ee45d86f7': 'code_25',
                },
            },
            {
                name: 'operator',
                type: 'SELECT',
                options: {
                    '=': 'equal ( = )',
                    '<>': 'not equal ( ≠ )',
                    '>': 'greater than ( > )',
                    '<': 'less than ( < )',
                    '>=': 'greater than or equal to ( >= )',
                    '<=': 'less than or equal to ( <= )',
                },
            },
            {
                name: 'value',
                type: 'TEXT',
            },
        ],
    },
    OPTION_ATTRIBUTE_VALUE_CONDITION: {
        type: 'OPTION_ATTRIBUTE_VALUE_CONDITION',
        name: 'Option attribute has value',
        phrase: 'Attribute [attribute] has option [value]',
        parameters: [
            {
                name: 'attribute',
                type: 'SELECT',
                options: {
                    'e45ec75b-44e2-5dd2-a558-51ed3d0af06f': 'code_41',
                    '39f3b186-0407-5755-a2bc-60b3e22b7a09': 'code_42',
                    'd49ffcc1-2880-5a1f-bdb6-1955d3015d22': 'code_43',
                    '0be4064c-d1d1-5a17-8328-5e0389ccc387': 'code_44',
                    '6f371c67-21f3-5b80-8c9d-41b09b64e462': 'code_45',
                    'af274203-ce99-5ab2-b589-a27dd8831719': 'code_46',
                    '8cefb378-f5ab-5f56-bd23-d9072dc6280e': 'code_47',
                    'dea99e98-1d41-58c0-a4a0-6f9905cdd74c': 'code_48',
                    '39c65d21-cc06-55b8-a5ee-c6ef0ecf7562': 'code_49',
                    'd48a1e58-4bf1-5014-9cc6-b879e5f044d0': 'code_50',
                },
            },
            {
                name: 'value',
                type: 'SELECT',
                affectedBy: 'attribute',
                complexOptions: {
                    'e45ec75b-44e2-5dd2-a558-51ed3d0af06f': {
                        '93891763-7c4f-4c9f-a05d-b1fe6c3aa89e': 'Option_EN_1_1',
                        'd36149a3-a874-4d90-b59f-37487ed767dc': 'Option_EN_1_2',
                        'af16b55d-6fec-435b-9136-6d0876b86363': 'Option_EN_1_3',
                        'e158b24a-57e3-4a25-80cc-6f9e6066a779': 'Option_EN_1_4',
                        '4e82275a-4fe2-49c9-a216-75b59786c0e4': 'Option_EN_1_5',
                    },
                    'af274203-ce99-5ab2-b589-a27dd8831719': {
                        'e0082e52-4ec4-4109-8976-c4b0e14d15db': 'Option_EN_2_1',
                        'f2b8c2a2-9a15-43b7-ab22-ac66a6bf3955': 'Option_EN_2_2',
                        '1922758a-7565-437a-af72-9c5b4dd4fe89': 'Option_EN_2_3',
                        '1246c083-2e3c-445d-827c-a7cce76b1e7b': 'Option_EN_2_4',
                        '14336a04-ae10-4883-978d-dce23bf214f8': 'Option_EN_2_5',
                    },
                },
            },
        ],
    },
    USER_EXACTLY_CONDITION: {
        type: 'USER_EXACTLY_CONDITION',
        name: 'User is exactly',
        phrase: 'User is exactly [user]',
        parameters: [
            {
                name: 'user',
                type: 'SELECT',
                options: {
                    '1d0d73c8-b5c2-5083-bbb1-f6740fa59a6d': 'Johnny Bravo',
                    'a208ae9c-9e2f-57b7-ab25-96611105061f': 'Dave Admin',
                    '6781f985-62f3-5e5e-a5f0-811c355bdb65': 'Paul Data Inputer',
                    '4fa1e018-4d8a-50f0-a2ec-ce517f9b0d4a': 'Karen Category Manager',
                },
            },
        ],
    },
    PRODUCT_SKU_EXISTS_CONDITION: {
        type: 'PRODUCT_SKU_EXISTS_CONDITION',
        name: 'Product sku exists',
        phrase: 'Product sku [operator] : [value]',
        parameters: [
            {
                name: 'operator',
                type: 'SELECT',
                options: {
                    '=': 'is equal',
                    '<>': 'is not equal',
                    HAS: 'has',
                    WILDCARD: 'match wildcard',
                    REGEXP: 'match regexp',
                },
            },
            {
                name: 'value',
                type: 'TEXT',
            },
        ],
    },
    PRODUCT_HAS_TEMPLATE_CONDITION: {
        type: 'PRODUCT_HAS_TEMPLATE_CONDITION',
        name: 'Product has template',
        phrase: 'Product [operator] template: [value]',
        parameters: [
            {
                name: 'operator',
                type: 'SELECT',
                options: {
                    HAS: 'has',
                    NOT_HAS: 'does not have',
                },
            },
            {
                name: 'template_id',
                type: 'SELECT',
                options: {
                    'fc72d9db-f9e9-4f26-81da-b6682c493eef': 'Template',
                    '367e4e3e-b838-4a64-ab6e-920249359341': 'test123',
                },
            },
        ],
    },
    PRODUCT_BELONG_CATEGORY_CONDITION: {
        type: 'PRODUCT_BELONG_CATEGORY_CONDITION',
        name: 'Product belongs to category',
        phrase: 'Product [operator] category : [category]',
        parameters: [
            {
                name: 'category',
                type: 'MULTI_SELECT',
                options: {
                    '1bfc2f93-8f61-59b5-9d68-8acff4e45321': 'code_1',
                    '7241101a-8e43-5bf8-8271-852d907734cd': 'code_10',
                    'a72bdcce-6bd6-5663-99ae-7bad19307aa6': 'code_2',
                    'b07154ca-3e19-5d69-9238-8fe2b0c5e49e': 'code_3',
                    '4c59d19f-e569-576b-a67f-e2d2094b19f5': 'code_4',
                    'ba986cf5-0d82-5312-90c5-ceedd1ea480d': 'code_5',
                    '6843ca66-24c6-5901-8678-98e098f0b3ba': 'code_6',
                    'f9e4f5a5-7a87-5efc-a680-cfbdb68b869f': 'code_7',
                    'fb471778-cbe7-56ca-ace7-0edd936092d7': 'code_8',
                    '6e94f902-fa20-5a99-9912-978b26493249': 'code_9',
                },
            },
            {
                name: 'operator',
                type: 'SELECT',
                options: {
                    BELONG_TO: 'belongs to',
                    NOT_BELONG_TO: 'doest not belongs to',
                },
            },
        ],
    },
    ROLE_EXACTLY_CONDITION: {
        type: 'ROLE_EXACTLY_CONDITION',
        name: 'User role is exactly',
        phrase: 'User role is exactly [role]',
        parameters: [
            {
                name: 'role',
                type: 'SELECT',
                options: {
                    '8bb9a292-cbf8-47b8-90b9-4bd2b35447f2': 'Admin',
                    '9431e2c1-4107-4737-a012-845c8c28594c': 'Data inputer',
                    'f84eea38-000e-4c3e-8a9b-71cad6ecfec8': 'Category manager',
                },
            },
        ],
    },
    PRODUCT_COMPLETENESS_CONDITION: {
        type: 'PRODUCT_COMPLETENESS_CONDITION',
        name: 'Product completeness',
        phrase: 'Product completeness : [completeness]',
        parameters: [
            {
                name: 'completeness',
                type: 'SELECT',
                options: {
                    complete: 'Product is complete',
                    'not complete': 'Product is not complete',
                },
            },
        ],
    },
    LANGUAGE_COMPLETENESS_CONDITION: {
        type: 'LANGUAGE_COMPLETENESS_CONDITION',
        name: 'Product translation completeness',
        phrase: 'Product translation completeness : [completeness]',
        parameters: [
            {
                name: 'completeness',
                type: 'SELECT',
                options: {
                    complete: 'Translation of the product is complete',
                    'not complete': 'Translation of the product is not complete',
                },
            },
            {
                name: 'language',
                type: 'SELECT',
                options: {
                    af_ZA: 'Afrikaans (South Africa)',
                    ar_DZ: 'Arabic (Algeria)',
                    ar_BH: 'Arabic (Bahrain)',
                    ar_AE: 'Arabic (United Arab Emirates)',
                    en_GB: 'English (United Kingdom)',
                    pl_PL: 'Polish (Poland)',
                },
            },
        ],
    },
};

export const conditionsValues = {
    o86m58ot9: {
        attribute: {
            id: '8a67367b-3c43-5b2d-8b66-cc345d2b2d75',
            key: '8a67367b-3c43-5b2d-8b66-cc345d2b2d75',
            value: 'code_22',
        },
        operator: {
            id: '=',
            key: '=',
            value: 'equal ( = )',
        },
        value: 123,
    },
    m0szb2e1u: {
        attribute: {
            id: 'e45ec75b-44e2-5dd2-a558-51ed3d0af06f',
            key: 'e45ec75b-44e2-5dd2-a558-51ed3d0af06f',
            value: 'code_41',
        },
        value: {
            id: '93891763-7c4f-4c9f-a05d-b1fe6c3aa89e',
            key: '93891763-7c4f-4c9f-a05d-b1fe6c3aa89e',
            value: 'Option_EN_1_1',
        },
    },
    t71dqcshp: {
        user: {
            id: '1d0d73c8-b5c2-5083-bbb1-f6740fa59a6d',
            key: '1d0d73c8-b5c2-5083-bbb1-f6740fa59a6d',
            value: 'Johnny Bravo',
        },
    },
    n2sx029k4: {
        operator: {
            id: '<>',
            key: '<>',
            value: 'is not equal',
        },
        value: '021',
    },
    xfugad5lp: {
        completeness: {
            id: 'complete',
            key: 'complete',
            value: 'Translation of the product is complete',
        },
        language: {
            id: 'ar_DZ',
            key: 'ar_DZ',
            value: 'Arabic (Algeria)',
        },
    },
    jpwuri1c3: {
        completeness: {
            id: 'complete',
            key: 'complete',
            value: 'Product is complete',
        },
    },
    nj37j126c: {
        role: {
            id: 'f84eea38-000e-4c3e-8a9b-71cad6ecfec8',
            key: 'f84eea38-000e-4c3e-8a9b-71cad6ecfec8',
            value: 'Category manager',
        },
    },
    grmrxg6qv: {
        user: {
            id: '6781f985-62f3-5e5e-a5f0-811c355bdb65',
            key: '6781f985-62f3-5e5e-a5f0-811c355bdb65',
            value: 'Paul Data Inputer',
        },
    },
    '2wb82fyyk': {
        operator: {
            id: '<>',
            key: '<>',
            value: 'is not equal',
        },
        value: '12',
    },
    d8x8uc5v6: {
        category: [
            {
                id: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
                key: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
                value: 'code_4',
            },
            {
                id: '6843ca66-24c6-5901-8678-98e098f0b3ba',
                key: '6843ca66-24c6-5901-8678-98e098f0b3ba',
                value: 'code_6',
            },
        ],
        operator: {
            id: 'NOT_BELONG_TO',
            key: 'NOT_BELONG_TO',
            value: 'doest not belongs to',
        },
    },
    j4luumpaq: {
        operator: {
            id: 'HAS',
            key: 'HAS',
            value: 'has',
        },
        template_id: {
            id: '367e4e3e-b838-4a64-ab6e-920249359341',
            key: '367e4e3e-b838-4a64-ab6e-920249359341',
            value: 'test123',
        },
    },
};

export const parsedConditions = [
    {
        type: 'NUMERIC_ATTRIBUTE_VALUE_CONDITION',
        attribute: '8a67367b-3c43-5b2d-8b66-cc345d2b2d75',
        operator: '=',
        value: 123,
    },
    {
        type: 'OPTION_ATTRIBUTE_VALUE_CONDITION',
        attribute: 'e45ec75b-44e2-5dd2-a558-51ed3d0af06f',
        value: '93891763-7c4f-4c9f-a05d-b1fe6c3aa89e',
    },
    {
        type: 'LANGUAGE_COMPLETENESS_CONDITION',
        completeness: 'complete',
        language: 'ar_DZ',
    },
    {
        type: 'PRODUCT_COMPLETENESS_CONDITION',
        completeness: 'complete',
    },
    {
        type: 'ROLE_EXACTLY_CONDITION',
        role: 'f84eea38-000e-4c3e-8a9b-71cad6ecfec8',
    },
    {
        type: 'USER_EXACTLY_CONDITION',
        user: '1d0d73c8-b5c2-5083-bbb1-f6740fa59a6d',
    },
    {
        type: 'USER_EXACTLY_CONDITION',
        user: '6781f985-62f3-5e5e-a5f0-811c355bdb65',
    },
    {
        type: 'PRODUCT_SKU_EXISTS_CONDITION',
        operator: '<>',
        value: '12',
    },
    {
        type: 'PRODUCT_BELONG_CATEGORY_CONDITION',
        category: [
            '4c59d19f-e569-576b-a67f-e2d2094b19f5',
            '6843ca66-24c6-5901-8678-98e098f0b3ba',
        ],
        operator: 'NOT_BELONG_TO',
    },
    {
        type: 'PRODUCT_SKU_EXISTS_CONDITION',
        operator: '<>',
        value: '021',
    },
    {
        type: 'PRODUCT_HAS_TEMPLATE_CONDITION',
        operator: 'HAS',
        template_id: '367e4e3e-b838-4a64-ab6e-920249359341',
    },
];

export const initialParsedConditions = {
    o86m58ot9: {
        type: 'NUMERIC_ATTRIBUTE_VALUE_CONDITION',
        attribute: '8a67367b-3c43-5b2d-8b66-cc345d2b2d75',
        operator: '=',
        value: 123,
        __initial: true,
    },
    m0szb2e1u: {
        type: 'OPTION_ATTRIBUTE_VALUE_CONDITION',
        attribute: 'e45ec75b-44e2-5dd2-a558-51ed3d0af06f',
        value: '93891763-7c4f-4c9f-a05d-b1fe6c3aa89e',
        __initial: true,
    },
    xfugad5lp: {
        type: 'LANGUAGE_COMPLETENESS_CONDITION',
        completeness: 'complete',
        language: 'ar_DZ',
        __initial: true,
    },
    jpwuri1c3: {
        type: 'PRODUCT_COMPLETENESS_CONDITION',
        completeness: 'complete',
        __initial: true,
    },
    nj37j126c: {
        type: 'ROLE_EXACTLY_CONDITION',
        role: 'f84eea38-000e-4c3e-8a9b-71cad6ecfec8',
        __initial: true,
    },
    t71dqcshp: {
        type: 'USER_EXACTLY_CONDITION',
        user: '1d0d73c8-b5c2-5083-bbb1-f6740fa59a6d',
        __initial: true,
    },
    grmrxg6qv: {
        type: 'USER_EXACTLY_CONDITION',
        user: '6781f985-62f3-5e5e-a5f0-811c355bdb65',
        __initial: true,
    },
    '2wb82fyyk': {
        type: 'PRODUCT_SKU_EXISTS_CONDITION',
        operator: '<>',
        value: '12',
        __initial: true,
    },
    d8x8uc5v6: {
        type: 'PRODUCT_BELONG_CATEGORY_CONDITION',
        category: [
            '4c59d19f-e569-576b-a67f-e2d2094b19f5',
            '6843ca66-24c6-5901-8678-98e098f0b3ba',
        ],
        operator: 'NOT_BELONG_TO',
        __initial: true,
    },
    n2sx029k4: {
        type: 'PRODUCT_SKU_EXISTS_CONDITION',
        operator: '<>',
        value: '021',
        __initial: true,
    },
    j4luumpaq: {
        type: 'PRODUCT_HAS_TEMPLATE_CONDITION',
        operator: 'HAS',
        template_id: '367e4e3e-b838-4a64-ab6e-920249359341',
        __initial: true,
    },
};
