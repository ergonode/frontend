/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
    Icons,
    Store,
} from '@Attributes/config/imports';
import {
    ROUTE_NAME,
} from '@Attributes/config/routes';
import {
    DRAGGED_ELEMENT,
    TYPES,
} from '@Attributes/defaults';
import {
    createOptionsData,
    getAttributeOptions,
    getTranslation,
    prepareOptionsData,
    prepareParametersData,
    prepareTextAreaData,
    setParametersData,
    setTextAreaData,
    setTranslation,
    updateOptionsData,
} from '@Attributes/extends/attribute/methods';
import {
    prepareTemplateData,
    setTemplateData,
} from '@Attributes/extends/productTemplate/methods';

const AttributeIcons = {
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
};
const getTypeConfiguration = ({
    $this, type,
}) => {
    switch (type) {
    case TYPES.DATE:
        return {
            params: {
                key: 'format',
                translation: $this.app.i18n.t('@Attributes.attributeExtend.methods.configFormat'),
                value: $this.state.dictionaries.dateFormats,
                fieldName: 'parameters',
            },
        };
    case TYPES.UNIT:
        return {
            params: {
                key: 'unit',
                translation: $this.app.i18n.t('@Attributes.attributeExtend.methods.configUnit'),
                value: $this.state.dictionaries.units,
                fieldName: 'parameters',
            },
        };
    case TYPES.PRICE:
        return {
            params: {
                key: 'currency',
                translation: $this.app.i18n.t('@Attributes.attributeExtend.methods.configCurrency'),
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
            defaultValue: {},
            request: {
                path: '/dictionary/attributes/types',
                config: {},
            },
            dataMapper: (response, $app) => Object.keys(response).reduce((acc, type) => {
                const tmpObject = acc;

                if ($app.i18n.te(`@Attributes.attribute._.types.${type}`)) {
                    tmpObject[type] = $app.i18n.t(`@Attributes.attribute._.types.${type}`);
                } else {
                    tmpObject[type] = response[type];
                }

                return tmpObject;
            }, {}),
        },
    ],
    extendStore: {
        attribute: Store.Attribute,
        productTemplate: Store.Template,
    },
    extendMethods: {
        '@Media/components/Buttons/LinkRelationButton/routeLinks': () => ({
            attribute: ROUTE_NAME.ATTRIBUTE_EDIT_GENERAL,
        }),
        '@Templates/components/Tabs/TemplateDesignerTab/verticalTabs': ({
            props,
            $this,
        }) => [
            {
                title: $this.$t('@Attributes.attributeExtend.components.AttributesVerticalTab.title'),
                component: Components.AttributesVerticalTab,
                icon: Icons.IconAttributes,
                props: {
                    scope: $this.scope,
                    isSelectLanguage: false,
                    ...props,
                },
            },
        ],
        '@Products/components/Tabs/ProductCatalogTab/verticalTabs': ({
            $this,
        }) => [
            {
                title: $this.$t('@Attributes.attributeExtend.components.AttributesVerticalTab.title'),
                component: Components.AttributesVerticalTab,
                icon: Icons.IconAttributes,
                props: {
                    scope: $this.scope,
                },
            },
            {
                title: $this.$t('@Attributes.attributeExtend.components.SystemAttributesVerticalTab.title'),
                component: Components.SystemAttributesVerticalTab,
                icon: Icons.IconSettings,
                props: {
                    scope: $this.scope,
                },
            },
        ],
        '@Products/components/Modals/AddProductRelationsModalGrid/verticalTabs': ({
            $this,
        }) => [
            {
                title: $this.$t('@Attributes.attributeExtend.components.AttributesVerticalTab.title'),
                component: Components.AttributesVerticalTab,
                icon: Icons.IconAttributes,
                props: {
                    scope: $this.scope,
                    isAddingEnabled: false,
                    draggingElementType: DRAGGED_ELEMENT.RELATION_ATTRIBUTE,
                },
            },
            {
                title: $this.$t('@Attributes.attributeExtend.components.SystemAttributesVerticalTab.title'),
                component: Components.SystemAttributesVerticalTab,
                icon: Icons.IconSettings,
                props: {
                    scope: $this.scope,
                    draggingElementType: DRAGGED_ELEMENT.RELATION_ATTRIBUTE,
                },
            },
        ],
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
            case TYPES.TEXT_AREA:
                return {
                    ...prepareTextAreaData({
                        $this,
                        typeConfig,
                    }),
                    ...getTranslation({
                        $this,
                    }),
                };
            case TYPES.NUMERIC:
            case TYPES.TEXT:
                return getTranslation({
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
                $this.commit('attribute/REMOVE_OPTIONS_STATE');
                break;
            default:
                break;
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
        '@Attributes/extends/components/SideBars/AttributeSideBarElement/icons': AttributeIcons,
        '@Templates/components/TemplateDesigner/ProductDesigner/AttributeElementContent/icons': AttributeIcons,
        '@Templates/components/Forms/ProductTemplateForm': {
            __ALL: [
                {
                    component: Components.ProductTemplateFormPresentation,
                    order: 20,
                },
            ],
        },
    },
};
