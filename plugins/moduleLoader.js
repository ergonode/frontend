/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
import modules from '@Root/config/.modules';
import additionalModules from '@Root/modules.config';

const ModuleLoader = {
    install() {
        const { router, menu } = this.getPagesConfiguration();
        Vue.prototype.$modulesConfiguration = {
            router,
            menu,
        };
    },
    getModulesConfiguration() {
        const { pages: modulePages, components: moduleComponents } = modules;
        const {
            pages: additionalModulePages,
            components: additionalModuleComponents,
        } = additionalModules;
        return {
            pages: [
                ...modulePages, ...additionalModulePages,
            ],
            components: [
                ...moduleComponents,
                ...additionalModuleComponents,
            ],
        };
    },
    getPagesConfiguration() {
        const { pages } = ModuleLoader.getModulesConfiguration();
        const pagesConfiguration = { router: [], menu: [], store: [] };
        for (let i = 0; i < pages.length; i += 1) {
            let config = null;
            const { isActive, name, source } = pages[i];
            const pageName = `pages/${name}`;
            if (!isActive) continue; // eslint-disable-line no-continue
            switch (source) {
            case 'local':
                config = require(`@Modules/${pageName}/config`).default;
                break;
            // case 'npm':
            //     config = require(`@NodeModules/${pageName}/config`).default;
            //     break;
            default:
                config = null;
            }
            if (config) {
                if (config.router) pagesConfiguration.router.push(...config.router);
                if (config.menu) pagesConfiguration.menu.push(...config.menu);
                if (config.store) {
                    pagesConfiguration.store.push({
                        source,
                        moduleName: pageName,
                        store: [...config.store],
                    });
                }
            }
        }
        return pagesConfiguration;
    },
    getData() {
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
        if (module) {
            return Vue.component(name, () => import(`@Modules/${module}/${componentPath}`));
        }
        return Vue.component(
            name,
            () => import(`~/components/${componentPath}`),
        );
    },
    removeComponent(name) {
        delete Vue.options.components[name];
    },
};

Vue.use(ModuleLoader);
export const {
    getPagesConfiguration,
} = ModuleLoader;
