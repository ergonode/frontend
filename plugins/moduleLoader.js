/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-param-reassign */
import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies

const ModuleLoader = (() => {
    let instance;
    const deepmerge = require('deepmerge');
    const modulesConfiguration = require('../modules.config').default || {};
    const { REQUIRED_MODULES } = require('../defaults/modules') || [];
    const getModules = () => {
        const keys = Object.keys(modulesConfiguration);
        const active = keys.filter((module) => modulesConfiguration[module].active);
        const inactive = keys.filter((module) => !modulesConfiguration[module].active);
        return {
            active: active.reduce((acc, module) => {
                const newObject = acc;
                newObject[module] = modulesConfiguration[module];
                return newObject;
            }, {}),
            inactive: inactive.reduce((acc, module) => {
                const newObject = acc;
                newObject[module] = modulesConfiguration[module];
                return newObject;
            }, {}),
        };
    };

    return {
        _requiredModules: REQUIRED_MODULES,
        _modules: getModules(),
        _modulesConfig: {
            nuxt: {},
            store: [],
            router: [],
            extendTabs: [],
            dictionaries: [],
            moduleRelations: [],
            extendComponents: {},
        },
        init() {
            console.log(this._modules);
            this.setModulesConfig(this._modules.active);
            this.checkRequiredModules();
            this.checkModuleRelations();
        },
        install(_Vue) {
            const { extendComponents } = this._modulesConfig;

            _Vue.prototype.$getComponentsForExtended = (type) => extendComponents[type];
        },
        get modulesConfig() {
            return this._modulesConfig;
        },
        setModulesConfig(modules) {
            this._modulesConfig = Object.keys(modules).reduce((acc, module) => {
                let config;
                const { path, type } = modules[module];
                const modulesConfig = acc;

                switch (type) {
                case 'local':
                    config = require(`../modules/${path}`).default;
                    break;
                case 'npm':
                    config = require(`${path}`);
                    break;
                default:
                    config = null;
                }

                if (config) {
                    if (config.router) modulesConfig.router.push(...config.router);
                    if (config.dictionaries) {
                        modulesConfig.dictionaries.push(...config.dictionaries);
                    }
                    if (config.store) {
                        modulesConfig.store.push({
                            type,
                            moduleName: path,
                            store: config.store,
                        });
                    }
                    if (config.nuxt) {
                        const modulePath = type === 'local'
                            ? `modules/${path}`
                            : path;

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
                        if (config.nuxt.middleware) {
                            const { middleware } = config.nuxt;

                            config.nuxt.middleware = async (ctx) => {
                                for (let i = 0; i < middleware.length; i += 1) {
                                    const importedMiddleware = require(`../modules/${path}${middleware[i]}`).default;

                                    importedMiddleware(ctx);
                                }
                            };
                        }
                        modulesConfig.nuxt = deepmerge(modulesConfig.nuxt, config.nuxt);
                    }
                    if (config.moduleRelations) {
                        modulesConfig.moduleRelations.push({
                            moduleName: path,
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
            }, this._modulesConfig);
        },
        checkRequiredModules() {
            this._requiredModules.forEach((module) => {
                if (!this._modules.active[module]) {
                    throw Error(`Module [${module}] does not exist.`);
                }
            });
        },
        checkModuleRelations() {
            const { moduleRelations: modulesRelations } = this._modulesConfig;

            modulesRelations.forEach((moduleRelations) => {
                const { moduleName, relations } = moduleRelations;

                relations.forEach((relation) => {
                    if (!this._modules.active[moduleName]) {
                        throw Error(`Module [${moduleName}] has relation with [${relation}].\n Module [${relation}] does not exist.`);
                    }
                });
            });
        },
        getInstance() {
            if (!instance) {
                instance = this.init();
            }
            return instance;
        },
    };
})();

ModuleLoader.getInstance();
Vue.use(ModuleLoader);

export const { modulesConfig } = ModuleLoader;
