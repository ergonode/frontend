/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
    Store,
} from '@AttributeGroups/config/imports';
import {
    getGroups,
    setGroups,
} from '@AttributeGroups/extends/attribute/methods';

export default {
    extendStore: {
        attribute: Store.Attribute,
    },
    extendMethods: {
        '@Attributes/store/attribute/action/createAttribute/__before': ({
            $this,
        }) => getGroups({
            $this,
        }),
        '@Attributes/store/attribute/action/getAttribute/__after': ({
            $this,
            data,
        }) => {
            setGroups({
                $this,
                data,
            });
        },
        '@Attributes/store/attribute/action/updateAttribute/__before': ({
            $this,
        }) => getGroups({
            $this,
        }),
    },
    extendComponents: {
        '@Attributes/components/Forms/AttributeForm': {
            __ALL: [
                {
                    component: Components.AttributeFormGroups,
                    props: {},
                    order: 10,
                },
            ],
        },
    },
};
