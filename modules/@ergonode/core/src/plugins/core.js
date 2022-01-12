/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import {
    changeCookiePosition,
    getCookieKey,
    getGridCookieKey,
    insertCookieAtIndex,
    removeCookieAtIndex,
} from '@Core/models/cookies';
import {
    isEmpty,
    isObject,
} from '@Core/models/objectWrapper';
import deepmerge from 'deepmerge';

export default ({
    app,
    store,
}, inject) => {
    inject('gridCookies', {
        set(layout = GRID_LAYOUT.TABLE, value) {
            app.$cookies.set(getGridCookieKey(store, app.context.route.name, layout), value);
        },
        get(layout = GRID_LAYOUT.TABLE) {
            return app.$cookies.get(getGridCookieKey(store, app.context.route.name, layout)) || '';
        },
        remove(layout = GRID_LAYOUT.TABLE) {
            app.$cookies.remove(getGridCookieKey(store, app.context.route.name, layout));
        },
        insertAtIndex(layout = GRID_LAYOUT.TABLE, index, value) {
            insertCookieAtIndex({
                cookies: app.$cookies,
                cookieName: getGridCookieKey(store, app.context.route.name, layout),
                index,
                data: value,
            });
        },
        removeAtIndex(layout = GRID_LAYOUT.TABLE, index) {
            removeCookieAtIndex({
                cookies: app.$cookies,
                cookieName: getGridCookieKey(store, app.context.route.name, layout),
                index,
            });
        },
        changePosition(layout = GRID_LAYOUT.TABLE, from, to) {
            changeCookiePosition({
                cookies: app.$cookies,
                cookieName: getGridCookieKey(store, app.context.route.name, layout),
                from,
                to,
            });
        },
    });
    inject('getExtendedLayoutSlot', ({
        key, layout,
    }) => {
        const extendedSlot = app.$getExtendSlot(key);

        if (Array.isArray(extendedSlot)) {
            return extendedSlot.filter(
                slot => !slot.layouts
                    || slot.layouts.length === 0
                    || slot.layouts.some(l => l === layout),
            );
        }

        Object.keys(extendedSlot).reduce((prev, curr) => {
            if (!extendedSlot[curr].layouts
                || extendedSlot[curr].layouts.length === 0
                || extendedSlot[curr].layouts.some(l => l === layout)) {
                return {
                    ...prev,
                    [curr]: extendedSlot[curr],
                };
            }

            return prev;
        }, {});

        return extendedSlot;
    });
    inject('userCookies', {
        set(key, value) {
            app.$cookies.set(getCookieKey(store, key), value);
        },
        get(key) {
            return app.$cookies.get(getCookieKey(store, key));
        },
        remove(key) {
            app.$cookies.remove(getCookieKey(store, key));
        },
    });
    inject('confirm', (payload) => {
        app.store.dispatch('core/addModal', {
            component: () => import('@UI/components/ConfirmModal/ConfirmModal'),
            props: payload,
        });
    });
    inject('extendedForm', ({
        key, type = null,
    }) => {
        const forAllTypes = '__ALL';
        const components = [];
        const extendedComponents = app.$getExtendSlot(key);
        const setOrder = data => ({
            ...data,
            order: data.order || 100,
        });
        const sortByOrder = (a, b) => a.order - b.order;

        if (isObject(extendedComponents)) {
            if (extendedComponents[forAllTypes]) {
                components.push(...extendedComponents[forAllTypes]);
            }
            if (type && extendedComponents[type]) {
                components.push(...extendedComponents[type]);
            }
        }

        return components
            .map(setOrder)
            .sort(sortByOrder);
    });
    inject('extendedProps', async ({
        key, name = null,
    }) => {
        let componentProps = {};
        const extendedProps = await app.$getExtendMethod(key, {
            $this: app,
        });

        if (Array.isArray(extendedProps) && extendedProps.length) {
            extendedProps.forEach((props) => {
                if (isObject(props)) {
                    componentProps = deepmerge(componentProps, props);
                }
            });

            if (name && !isEmpty(componentProps) && componentProps[name]) {
                const properties = componentProps[name];
                const setPriority = data => ({
                    ...data,
                    priority: data.priority || 0,
                });
                const removeDuplication = (acc, current) => {
                    const tmp = acc;

                    if (!tmp[current.key]) {
                        tmp[current.key] = current;
                    } else if (tmp[current.key] && tmp[current.key].priority <= current.priority) {
                        tmp[current.key] = current;
                    }

                    return tmp;
                };
                const prepareProps = properties
                    .map(setPriority)
                    .reduce(removeDuplication, {});
                const reduceToProps = (prev, curr) => ({
                    ...prev,
                    [curr[0]]: curr[1].value,
                });

                return Object.entries(prepareProps).reduce(reduceToProps, {});
            }
        }

        return {};
    });
};
