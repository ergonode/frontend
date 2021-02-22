/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    isEmpty,
    isObject,
} from '@Core/models/objectWrapper';
import deepmerge from 'deepmerge';

export default ({
    app,
}, inject) => {
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

        if (extendedComponents && isObject(extendedComponents)) {
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

        if (extendedProps.length) {
            extendedProps.forEach((props) => {
                componentProps = deepmerge(componentProps, props);
            });
        }
        if (name && !isEmpty(componentProps)) {
            const properties = componentProps[name];
            const setPriority = data => ({
                ...data,
                priority: data.priority || 0,
            });
            const reduceDuplication = (acc, current) => {
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
                .reduce(reduceDuplication, {});
            const reduceToProps = (prev, curr) => ({
                ...prev,
                [curr[0]]: curr[1].value,
            });

            return Object.entries(prepareProps).reduce(reduceToProps, {});
        }

        return {};
    });
};
