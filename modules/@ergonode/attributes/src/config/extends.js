/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    SKU_MODEL,
    TYPES,
} from '@Attributes/defaults/attributes';
import {
    createOptionsData,
    getAttributeOptions,
    prepareOptionsData,
    prepareParametersData,
    prepareTextAreaData,
    setParametersData,
    setTextAreaData,
    setTranslation,
    updateOptionsData,
    updateTranslation,
} from '@Attributes/extends/methods/attribute';
import {
    prepareTemplateData,
    setTemplateData,
} from '@Attributes/extends/methods/template';

import {
    Components,
    Icons,
    Store,
} from './imports';

const getTypeConfiguration = ({
    $this, type,
}) => {
    switch (type) {
    case TYPES.DATE:
        return {
            params: {
                key: 'format',
                value: $this.state.dictionaries.dateFormats,
                fieldName: 'parameters',
            },
        };
    case TYPES.UNIT:
        return {
            params: {
                key: 'unit',
                value: $this.state.dictionaries.units,
                fieldName: 'parameters',
            },
        };
    case TYPES.PRICE:
        return {
            params: {
                key: 'currency',
                value: $this.state.dictionaries.currencies,
                fieldName: 'parameters',
            },
        };
    case TYPES.TEXT_AREA:
        return {
            params: {
                key: 'richEdit',
                fieldName: 'parameters',
            },
        };
    case TYPES.SELECT:
        return {
            params: {
                fieldName: 'options',
            },
        };
    case TYPES.MULTI_SELECT:
        return {
            params: {
                fieldName: 'options',
            },
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
        productTemplate: Store.Template,
    },
    extendMethods: {
        '@Attributes/store/attribute/action/createAttribute/__before': ({
            $this, type,
        }) => {
            const typeConfig = getTypeConfiguration({
                $this,
                type,
            });

            switch (type) {
            case TYPES.DATE:
            case TYPES.UNIT:
            case TYPES.PRICE:
                return prepareParametersData({
                    $this,
                    typeConfig,
                });
            case TYPES.TEXT_AREA:
                return prepareTextAreaData({
                    $this,
                    typeConfig,
                });
            case TYPES.SELECT:
            case TYPES.MULTI_SELECT:
                return prepareOptionsData({
                    $this,
                    typeConfig,
                });
            default:
                return {};
            }
        },
        '@Attributes/store/attribute/action/createAttribute/__after': ({
            $this,
            data,
            type,
        }) => {
            const typeConfig = getTypeConfiguration({
                $this,
                type,
            });

            switch (type) {
            case TYPES.SELECT:
            case TYPES.MULTI_SELECT:
                return createOptionsData({
                    $this,
                    typeConfig,
                    data,
                });
            default:
                return {};
            }
        },
        '@Attributes/store/attribute/action/updateAttribute/__before': async ({
            $this, type, data,
        }) => {
            const typeConfig = getTypeConfiguration({
                $this,
                type,
            });

            switch (type) {
            case TYPES.DATE:
            case TYPES.UNIT:
            case TYPES.PRICE:
                return prepareParametersData({
                    $this,
                    typeConfig,
                });
            case TYPES.SELECT:
            case TYPES.MULTI_SELECT:
                await prepareOptionsData({
                    $this,
                    typeConfig,
                });

                await updateOptionsData({
                    $this,
                    data,
                });

                return {};
            case TYPES.NUMERIC:
            case TYPES.TEXT:
            case TYPES.TEXT_AREA:
                return updateTranslation({
                    $this,
                });
            default:
                return {};
            }
        },
        '@Attributes/store/attribute/action/updateAttribute/__after': ({
            $this, type,
        }) => {
            switch (type) {
            case TYPES.SELECT:
            case TYPES.MULTI_SELECT:
                $this.commit('attribute/REMOVE_UPDATED_OPTION');
                break;
            default:
                break;
            }
        },
        '@Attributes/store/attribute/action/getAttributesOptionsByType/__after': ({
            type,
        }) => {
            switch (type) {
            case TYPES.TEXT:
                // TODO: Temporary till BE will create SKU as an attribute
                return [
                    SKU_MODEL,
                ];
            default:
                return [];
            }
        },
        '@Attributes/store/attribute/action/getAttribute/__after': async ({
            $this, data, type,
        }) => {
            const typeConfig = getTypeConfiguration({
                $this,
                type,
            });

            switch (type) {
            case TYPES.DATE:
            case TYPES.UNIT:
            case TYPES.PRICE:
                setParametersData({
                    $this,
                    data,
                    typeConfig,
                });
                break;
            case TYPES.TEXT_AREA:
                setTranslation({
                    $this,
                    data,
                });
                setTextAreaData({
                    $this,
                    data,
                    typeConfig,
                });
                break;
            case TYPES.NUMERIC:
            case TYPES.TEXT:
                setTranslation({
                    $this,
                    data,
                });
                break;
            case TYPES.SELECT:
            case TYPES.MULTI_SELECT:
                await getAttributeOptions({
                    $this,
                    data,
                });
                break;
            default:
                break;
            }
        },
        '@Templates/store/productTemplate/action/createTemplate/__before': ({
            $this,
        }) => prepareTemplateData({
            $this,
        }),
        '@Templates/store/productTemplate/action/updateTemplate/__before': ({
            $this,
        }) => prepareTemplateData({
            $this,
        }),
        '@Templates/store/productTemplate/action/getTemplate/__after': ({
            $this, data,
        }) => {
            setTemplateData({
                $this,
                data,
            });
        },
    },
    extendComponents: {
        '@Attributes/components/Forms/AttributeForm': {
            [TYPES.DATE]: [
                {
                    component: Components.AttributeFormParamsSelect,
                    props: {
                        getParams: $this => getTypeConfiguration({
                            $this: $this.$store,
                            type: TYPES.DATE,
                        }),
                    },
                },
            ],
            [TYPES.UNIT]: [
                {
                    component: Components.AttributeFormParamsSelect,
                    props: {
                        getParams: $this => getTypeConfiguration({
                            $this: $this.$store,
                            type: TYPES.UNIT,
                        }),
                    },
                },
            ],
            [TYPES.PRICE]: [
                {
                    component: Components.AttributeFormParamsSelect,
                    props: {
                        getParams: $this => getTypeConfiguration({
                            $this: $this.$store,
                            type: TYPES.PRICE,
                        }),
                    },
                },
            ],
            [TYPES.TEXT_AREA]: [
                {
                    component: Components.AttributeFormParamsToggle,
                    props: {
                        getParams: () => getTypeConfiguration({
                            type: TYPES.TEXT_AREA,
                        }),
                    },
                },
            ],
            [TYPES.SELECT]: [
                {
                    component: Components.AttributeFormOptions,
                },
            ],
            [TYPES.MULTI_SELECT]: [
                {
                    component: Components.AttributeFormOptions,
                },
            ],
        },
        '@Attributes/components/Forms/AttributeTranslationForm': {
            [TYPES.NUMERIC]: [
                {
                    component: Components.AttributeTranslationFormPlaceholder,
                },
            ],
            [TYPES.TEXT]: [
                {
                    component: Components.AttributeTranslationFormPlaceholder,
                },
            ],
            [TYPES.TEXT_AREA]: [
                {
                    component: Components.AttributeTranslationFormPlaceholder,
                },
            ],
            [TYPES.SELECT]: [
                {
                    component: Components.AttributeTranslationFormOptions,
                },
            ],
            [TYPES.MULTI_SELECT]: [
                {
                    component: Components.AttributeTranslationFormOptions,
                },
            ],
        },
        '@Attributes/components/Lists/AttributeListElement/Icon': {
            [TYPES.NUMERIC]: [
                {
                    component: Icons.IconNumeric,
                },
            ],
            [TYPES.TEXT]: [
                {
                    component: Icons.IconText,
                },
            ],
            [TYPES.TEXT_AREA]: [
                {
                    component: Icons.IconTextArea,
                },
            ],
            [TYPES.SELECT]: [
                {
                    component: Icons.IconSelect,
                },
            ],
            [TYPES.MULTI_SELECT]: [
                {
                    component: Icons.IconMultiSelect,
                },
            ],
            [TYPES.DATE]: [
                {
                    component: Icons.IconDate,
                },
            ],
            [TYPES.UNIT]: [
                {
                    component: Icons.IconUnit,
                },
            ],
            [TYPES.PRICE]: [
                {
                    component: Icons.IconPrice,
                },
            ],
            [TYPES.IMAGE]: [
                {
                    component: Icons.IconImage,
                },
            ],
        },
        '@Templates/components/Forms/ProductTemplateForm': {
            __ALL: [
                {
                    component: Components.ProductTemplateFormPresentation,
                },
            ],
        },
    },
};
