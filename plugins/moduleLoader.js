/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
// import { modules } from '@Root/modules.config';

const modules = [];

const ModuleLoader = {
    install() {
        this.getData().then((components) => {
            components.forEach((component) => {
                this.getComponent(component.path, component.module);
            });
        });
    },
    getRouterConfigs() {
        return modules.reduce((previousObject, currentObject) => {
            let config = null;
            switch (currentObject.moduleSource) {
            // TODO: commented because when there is no directory for an alias, nuxt returns an error.
            // TODO: uncomment if  we have modules to load
            // case 'vendor':
            //     config = require(`@Vendors/${currentObject.name}/config`); // eslint-disable-line global-require, import/no-dynamic-require
            //     break;
            // case 'module':
            //     config = require(`@Modules/${currentObject.name}/config`); // eslint-disable-line global-require, import/no-dynamic-require
            //     break;
            default:
                config = null;
            }
            if (config) {
                const { router } = config;
                previousObject.push(...router);
            }
            return previousObject;
        }, []);
    },

    getData() {
        // async load data
        // for auto components loading
        return new Promise(((resolve) => {
            // Example output: data = [{ module: 'Categories', path: 'CategoriesTest' }]
            const data = [];
            resolve(data);
        }));
    },

    getComponent(componentPath, module = null) { // eslint-disable-line
        const name = componentPath.split('/').pop();
        if (Vue.options.components[name]) {
            return Vue.options.components[name];
        }
        // TODO: commented because when there is no directory for an alias, nuxt returns an error.
        // TODO: uncomment if  we have modules to load
        // if (module) {
        //    return Vue.component(name, () => import(`@Modules/${module}/${componentPath}`));
        // }
        return Vue.component(
            name,
            () => import(`~/components/${componentPath}`),
        );
    },

    getPage(pagePath, module = false, source) {
        if (module) {
            switch (source) {
            // TODO: commented because when there is no directory for an alias,
            // nuxt returns an error.
            // TODO: uncomment if  we have modules to load
            // case 'vendor':
            //     return () => import(`@Vendors/${module}/${pagePath}` /* webpackChunkName: "module_pages" */).then(m => m.default || m);
            // case 'module':
            //     return () => import(`@Modules/${module}/${pagePath}` /* webpackChunkName: "module_pages" */).then(m => m.default || m);
            default:
                return null;
            }
        }
        return () => import(`@/pages/${pagePath}`).then(m => m.default || m);
    },

    removeComponent(name) {
        delete Vue.options.components[name];
    },
};

Vue.use(ModuleLoader);
export default ModuleLoader;
