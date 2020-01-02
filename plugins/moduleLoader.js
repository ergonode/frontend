/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-param-reassign */
import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
import { REQUIRED_MODULES } from '../defaults/modules';

const deepmerge = require('deepmerge');


class ModuleLoader {
    constructor() {
        this.modules = this.getActiveModules();
        this.modulesConfig = this.getModules(this.modules);
        this.checkRequiredModules();
        this.checkModuleRelations();
    }

    install(_Vue) {
        const { extendComponents } = this.modulesConfig;

        _Vue.prototype.$getComponentsForExtended = (type) => extendComponents[type];
    }

    get getModulesConfig() {
        return this.modulesConfig;
    }

    checkRelation(relation) {
        return this.modules.find(
            (module) => relation === module.name && module.active,
        );
    }

    checkRequiredModules() {
        REQUIRED_MODULES.forEach((module) => {
            if (!this.checkRelation(module)) {
                throw Error(`Module [${module}] does not exist.`);
            }
        });
    }

    checkModuleRelations() {
        const { relations } = this.modulesConfig;

        relations.forEach((relation) => {
            const { moduleName, relations: moduleRealtions } = relation;

            moduleRealtions.forEach((r) => {
                if (!this.checkRelation(r)) {
                    throw Error(`Module [${moduleName}] has relation with [${r}].\n Module [${r}] does not exist.`);
                }
            });
        });
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
            // case 'npm':
            //     config = require(`${name}`);
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
                        store: config.store,
                    });
                }
                if (config.nuxt) {
                    const modulePath = source === 'local'
                        ? `modules/${name}`
                        : name;

                    if (config.nuxt.aliases) {
                        const { aliases } = config.nuxt;

                        Object.keys(aliases).forEach((alias) => {
                            config.nuxt.aliases[alias] = `/${modulePath}${aliases[alias]}`;
                        });
                    }
                    if (config.nuxt.css) {
                        const { css } = config.nuxt;

                        css.forEach((style, index) => {
                            config.nuxt.css[index] = `~${modulePath}${style}`;
                        });
                    }
                    if (config.nuxt.styleResources) {
                        const { styleResources } = config.nuxt;

                        Object.keys(styleResources).forEach((resource) => {
                            config.nuxt.styleResources[resource] = `~${modulePath}${styleResources[resource]}`;
                        });
                    }
                    if (config.nuxt.plugins) {
                        const { plugins } = config.nuxt;

                        plugins.forEach((plugin, index) => {
                            if (typeof plugin === 'string') {
                                config.nuxt.plugins[index] = `~${modulePath}${plugin}`;
                            } else {
                                config.nuxt.plugins[index] = {
                                    src: `~${modulePath}${plugin.src}`,
                                    mode: plugin.mode,
                                };
                            }
                        });
                    }
                    modulesConfig.nuxt = deepmerge(modulesConfig.nuxt, config.nuxt);
                }
                if (config.moduleRelations) {
                    modulesConfig.relations.push({
                        moduleName: name,
                        relations: config.moduleRelations,
                    });
                }
                if (config.extendComponents) {
                    modulesConfig.extendComponents = deepmerge(
                        modulesConfig.extendComponents,
                        config.extendComponents,
                    );
                }
                if (config.extendTabs) {
                    modulesConfig.extendTabs.push(...config.extendTabs);
                }
            }
            return modulesConfig;
        }, {
            router: [],
            store: [],
            nuxt: {},
            relations: [],
            extendComponents: {},
            extendTabs: [],
        });
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
