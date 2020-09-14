/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    prepareOptionsData,
    prepareParametersData,
    prepareTextAreaData,
    sendOptionsData,
    setParametersData,
    setTextAreaData,
} from '@Attributes/extends/methods';

import {
    Components,
    Icons,
    Store,
} from './imports';

const getTypeConfiguration = ({
    $this = null, type,
}) => {
    switch (type) {
    case 'DATE':
        return {
            params: {
                key: 'format',
                value: $this.state.dictionaries.dateFormats,
                fieldName: 'parameters',
            },
            icon: Icons.IconDate,
        };
    case 'UNIT':
        return {
            params: {
                key: 'unit',
                value: $this.state.dictionaries.units,
                fieldName: 'parameters',
            },
            icon: Icons.IconUnit,
        };
    case 'PRICE':
        return {
            params: {
                key: 'currency',
                value: $this.state.dictionaries.currencies,
                fieldName: 'parameters',
            },
            icon: Icons.IconPrice,
        };
    case 'TEXT_AREA':
        return {
            params: {
                key: 'richEdit',
                fieldName: 'parameters',
            },
            icon: Icons.IconTextArea,
        };
    case 'TEXT':
        return {
            icon: Icons.IconText,
        };
    case 'NUMERIC':
        return {
            icon: Icons.Numeric,
        };
    case 'SELECT':
        return {
            params: {
                fieldName: 'options',
            },
            icon: Icons.IconSelect,
        };
    case 'MULTI_SELECT':
        return {
            params: {
                fieldName: 'options',
            },
            icon: Icons.IconMultiSelect,
        };
    case 'IMAGE':
        return {
            icon: Icons.IconImage,
        };
    case 'GALLERY':
        return {
            icon: null,
        };
    case 'FILE':
        return {
            icon: null,
        };
    default:
        return null;
    }
};

export default {
    dictionaries: [
        {
            stateProp: 'attrTypes',
            dataFormat: {},
            requestPath: '/dictionary/attributes/types',
        },
    ],
    extendStore: {
        attribute: Store.Attribute,
    },
    extendMethods: {
        '@Attributes/store/attribute/action/createAttribute/__before': ({
            $this, type,
        }) => {
            const typeConfig = getTypeConfiguration({
                $this,
                type,
            });

            if (typeConfig) {
                switch (type) {
                case 'DATE':
                case 'UNIT':
                case 'PRICE':
                    return prepareParametersData({
                        $this,
                        typeConfig,
                    });
                case 'TEXT_AREA':
                    return prepareTextAreaData({
                        $this,
                        typeConfig,
                    });
                case 'SELECT':
                case 'MULTI_SELECT':
                    return prepareOptionsData({
                        $this,
                        typeConfig,
                    });
                default:
                    return {};
                }
            }
            return {};
        },
        '@Attributes/store/attribute/action/createAttribute/__after': ({
            $this, data, type,
        }) => {
            const typeConfig = getTypeConfiguration({
                $this,
                type,
            });

            if (typeConfig) {
                switch (type) {
                case 'SELECT':
                case 'MULTI_SELECT':
                    return sendOptionsData({
                        $this,
                        typeConfig,
                        data,
                    });
                default:
                    return {};
                }
            }
            return {};
        },
        '@Attributes/store/attribute/action/getAttribute/__after': ({
            $this, data, type,
        }) => {
            const typeConfig = getTypeConfiguration({
                $this,
                type,
            });

            if (typeConfig) {
                switch (type) {
                case 'DATE':
                case 'UNIT':
                case 'PRICE':
                    return setParametersData({
                        $this,
                        data,
                        typeConfig,
                    });
                case 'TEXT_AREA':
                    return setTextAreaData({
                        $this,
                        data,
                        typeConfig,
                    });
                default:
                    return {};
                }
            }
            return {};
        },
    },
    extendComponents: {
        '@Attributes/components/Forms/AttributeForm': {
            DATE: {
                component: Components.AttributeFormParamsSelect,
                props: {
                    getParams: $this => getTypeConfiguration({
                        $this: $this.$store,
                        type: 'DATE',
                    }),
                },
            },
            UNIT: {
                component: Components.AttributeFormParamsSelect,
                props: {
                    getParams: $this => getTypeConfiguration({
                        $this: $this.$store,
                        type: 'UNIT',
                    }),
                },
            },
            PRICE: {
                component: Components.AttributeFormParamsSelect,
                props: {
                    getParams: $this => getTypeConfiguration({
                        $this: $this.$store,
                        type: 'PRICE',
                    }),
                },
            },
            TEXT_AREA: {
                component: Components.AttributeFormParamsToggle,
                props: {
                    getParams: () => getTypeConfiguration({
                        type: 'TEXT_AREA',
                    }),
                },
            },
            SELECT: {
                component: Components.AttributeFormOptions,
            },
            MULTI_SELECT: {
                component: Components.AttributeFormOptions,
            },
        },
        '@Attributes/components/Forms/AttributeTranslationForm': {
            NUMERIC: {
                component: Components.AttributeTranslationFormPlaceholder,
            },
            TEXT: {
                component: Components.AttributeTranslationFormPlaceholder,
            },
            TEXT_AREA: {
                component: Components.AttributeTranslationFormPlaceholder,
            },
            SELECT: {
                component: Components.AttributeTranslationFormOptions,
            },
            MULTI_SELECT: {
                component: Components.AttributeTranslationFormOptions,
            },
        },
    },
};
