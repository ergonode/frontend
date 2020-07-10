/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const getNestedTabRoutes = (hasAccess, routes, currentRoute) => {
    const {
        length,
    } = routes;
    const childRoutes = [];

    for (let i = 0; i < length; i += 1) {
        const {
            children,
        } = routes[i];

        if (children
            && children.find(nestedRoute => nestedRoute.name === currentRoute.name)) {
            for (let j = 0; j < children.length; j += 1) {
                if (hasAccess(children[j].meta.privileges)) {
                    childRoutes.push({
                        title: children[j].meta.title,
                        route: {
                            name: children[j].name,
                        },
                        isReadOnly: children[j].meta.isReadOnly,
                    });
                }
            }
            return childRoutes;
        }
    }

    return [];
};

export const getParentRoutePath = currentRoute => `/${currentRoute.path.split('/')[1]}`;
