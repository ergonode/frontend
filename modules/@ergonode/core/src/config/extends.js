/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
    Icons,
} from '@Core/config/imports';

export default {
    dictionaries: [
        {
            stateProp: 'currencies',
            defaultValue: {},
            request: {
                path: '/dictionary/currencies',
                config: {},
            },
            dataMapper: response => response,
        },
        {
            stateProp: 'units',
            defaultValue: [],
            request: {
                path: '/units?view=list',
                config: {},
            },
            dataMapper: response => response.collection,
        },
        {
            stateProp: 'dateFormats',
            defaultValue: {},
            request: {
                path: '/dictionary/date_format',
                config: {},
            },
            dataMapper: response => response,
        },
    ],
    extendMethods: {
        '@Core/components/Tabs/LanguagesSettingsTab/verticalTabs': ({
            props,
            $this,
        }) => [
            {
                title: $this.$t('@Core.core._.systemLanguagesTitle'),
                component: Components.LanguagesVerticalTab,
                icon: Icons.IconTranslate,
                props: {
                    scope: $this.scope,
                    ...props,
                },
            },
        ],
    },
};
