/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-param-reassign */
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
        const { router } = this.pagesConfig;
        _Vue.prototype.$modulesConfiguration = {
            router,
        };
    }

    setModulesConfiguration() {
        const baseConfig = require('@Root/modules.config');

        if (baseConfig) {
            return {
                pages: baseConfig.default.filter((e) => e.type === 'page'),
                components: baseConfig.default.filter((e) => e.type === 'component'),
            };
        }

        return {};
    }

    setPagesConfiguration({ pages }) {
        const pagesConfiguration = { router: [], store: [] };
        const filteredPages = pages.filter((page) => page.active);

        for (let i = 0; i < filteredPages.length; i += 1) {
            let config = null;
            const { name, source } = filteredPages[i];

            switch (source) {
            case 'local':
                config = require(`@Modules/${name}`).default;
                break;
            // TODO: uncomment when npm modules ready
            // case 'npm':
            //     config = require(`@NodeModules/${pageName}`).default;
            //     break;
            default:
                config = null;
            }
            if (config) {
                if (config.router) pagesConfiguration.router.push(...config.router);
                if (config.store) {
                    pagesConfiguration.store.push({
                        source,
                        moduleName: name,
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
