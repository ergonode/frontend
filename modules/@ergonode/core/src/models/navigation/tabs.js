/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    toLowerCaseFirstLetter,
} from '@Core/models/stringWrapper';

export const getNestedTabRoutes = ({
    hasAccess,
    routes,
    route,
}) => {
    const {
        length,
    } = routes;
    const childRoutes = [];

    for (let i = 0; i < length; i += 1) {
        const {
            children,
        } = routes[i];

        if (children
            && children.find(nestedRoute => nestedRoute.name === route.name)) {
            for (let j = 0; j < children.length; j += 1) {
                const {
                    meta,
                } = children[j];
                const {
                    visible = true,
                    privileges,
                    title,
                    isReadOnly,
                } = meta;

                if (hasAccess(privileges)) {
                    childRoutes.push({
                        title,
                        route: {
                            name: children[j].name,
                        },
                        visible,
                        isReadOnly,
                        scope: toLowerCaseFirstLetter(children[j].component.name),
                    });
                }
            }
            return childRoutes;
        }
    }

    return [];
};

export const getParentRoutePath = currentRoute => `/${currentRoute.path.split('/')[1]}`;
