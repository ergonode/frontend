/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies

class ModuleLoader {
    constructor() {
        this.config = this.setModulesConfiguration();
        this.pagesConfig = this.setPagesConfiguration(this.config);
        this.componentsConfig = this.setComponentsConfiguration(this.config);
    }

    get getPagesConfig() {
        return this.pagesConfig;
    }

    get getComponentsConfig() {
        return this.componentsConfig;
    }

    install(_Vue) {
        const { router, menu } = this.pagesConfig;
        _Vue.prototype.$modulesConfiguration = {
            router,
            menu,
        };
    }

    getDefaultModuleConfig() {
        try {
            return require('@Root/config/modules');
        } catch (e) {
            return false;
        }
    }

    setModulesConfiguration() {
        let summaryConfig = { pages: [], components: [] };
        const modulesConfig = this.getDefaultModuleConfig();
        const additionalConfig = require('@Root/modules.config');

        if (modulesConfig) {
            const { pages: modulePages, components: moduleComponents } = modulesConfig.default;

            summaryConfig = {
                pages: [...modulePages],
                components: [...moduleComponents],
            };
        }
        if (additionalConfig) {
            const {
                pages: additionalConfigPages,
                components: additionalConfigComponents,
            } = additionalConfig.default;

            summaryConfig.pages.push(...additionalConfigPages);
            summaryConfig.components.push(...additionalConfigComponents);
        }
        return summaryConfig;
    }

    setPagesConfiguration({ pages }) {
        const pagesConfiguration = { router: [], menu: [], store: [] };
        const filteredPages = pages.filter(page => page.isActive);

        for (let i = 0; i < filteredPages.length; i += 1) {
            let config = null;
            const { name, source } = filteredPages[i];
            const pageName = `pages/${name}`;

            switch (source) {
            case 'local':
                config = require(`@Modules/${pageName}/config`).default;
                break;
            // TODO: uncomment when npm modules ready
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
    }

    // TODO: complete when components modules ready
    setComponentsConfiguration({ components }) {
        return components;
    }
    // TODO: old methods to refactor, don't remove
    // getComponent(componentPath, module = null) {
    //     const name = componentPath.split('/').pop();

    //     if (Vue.options.components[name]) {
    //         return Vue.options.components[name];
    //     }
    //     if (module) {
    //         return Vue.component(name, () => import(`@Modules/${module}/${componentPath}`));
    //     }
    //     return Vue.component(
    //         name,
    //         () => import(`~/components/${componentPath}`),
    //     );
    // }

    // removeComponent(name) {
    //     delete Vue.options.components[name];
    // }
}

const Modules = new ModuleLoader();
Vue.use(Modules);
export const {
    getPagesConfig,
    getComponentsConfig,
} = Modules;
