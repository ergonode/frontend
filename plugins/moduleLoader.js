/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-param-reassign */
import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies

const deepmerge = require('deepmerge');

class ModuleLoader {
    constructor() {
        this.config = this.getActiveModules();
        this.modulesConfig = this.getModules(this.config);
    }

    get getModulesConfig() {
        return this.modulesConfig;
    }

    getActiveModules() {
        const baseConfig = require('../modules.config');

        if (baseConfig) {
            return baseConfig.default.filter((e) => e.active);
        }

        return [];
    }

    getModules(modules) {
        return modules.reduce((acc, module) => {
            const modulesConfig = acc;
            const { name, source } = module;
            let config = null;

            switch (source) {
            case 'local':
                config = require(`../modules/${name}`).default;
                break;
            // TODO: uncomment when npm modules ready
            // case 'npm':
            //     config = require(`${name}`).default;
            //     break;
            default:
                config = null;
            }

            if (config) {
                if (config.router) modulesConfig.router.push(...config.router);
                if (config.store) {
                    modulesConfig.store.push({
                        source,
                        moduleName: name,
                        store: [...config.store],
                    });
                }
                if (config.nuxt) {
                    modulesConfig.nuxt = deepmerge(modulesConfig.nuxt, config.nuxt);
                }
            }

            return modulesConfig;
        }, { router: [], store: [], nuxt: {} });
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
    getModulesConfig,
} = Modules;
