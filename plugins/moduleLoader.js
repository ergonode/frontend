/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-param-reassign */
import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies

const ModuleLoader = (() => {
    let instance;
    const isDev = process.env.NODE_ENV === 'development';
    const deepmerge = require('deepmerge');
    const modulesConfiguration = require('../config/.modules').default || {};
    const { REQUIRED_MODULES, CORE_MODULES } = require('../defaults/modules');

    return {
        _requiredModules: REQUIRED_MODULES,
        _modules: modulesConfiguration,
        _modulesConfig: {
            nuxt: {},
            store: [],
            router: [],
            extendTabs: [],
            dictionaries: [],
            moduleRelations: [],
            extendComponents: {},
        },
        _inactiveModulesConfig: {
            nuxt: {},
        },
        init() {
            this.setModulesConfig(this._modules.active || []);
            this.setInactiveModulesConfig(this._modules.inactive || []);
            this.checkRequiredModules();
            this.checkModuleRelations();
            if (isDev) this.inactiveModulesInfo();
        },
        install(_Vue) {
            const { extendComponents } = this._modulesConfig;

            _Vue.prototype.$getComponentsForExtended = (type) => extendComponents[type];
        },
        get modulesConfig() {
            return this._modulesConfig;
        },
        get inactiveModulesConfig() {
            return this._inactiveModulesConfig;
        },
        configType({ path, type }) {
            switch (type) {
            case 'local':
                return require(`../modules/${path}`).default;
            case 'npm':
                return require(`${path}`);
            default:
                return null;
            }
        },
        setModulesConfig(modules) {
            this._modulesConfig = modules.reduce((acc, module) => {
                const moduleName = module.replace('@ergo/', '');
                const { path, type } = CORE_MODULES[module];
                const config = this.configType(CORE_MODULES[module]);
                const modulesConfig = acc;

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
                        config.nuxt.chunks = {
                            [`${moduleName}Module`]: {
                                test(mod) {
                                    return mod.resource && mod.resource.includes(`modules/${module}`);
                                },
                                chunks: 'all',
                                name: `${moduleName}Module`,
                                priority: -20,
                            },
                        };
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
        setInactiveModulesConfig(modules) {
            this._inactiveModulesConfig = modules.reduce((acc, module) => {
                const { path, type } = CORE_MODULES[module];
                const config = this.configType(CORE_MODULES[module]);
                const modulesConfig = acc;

                if (config && config.nuxt) {
                    const modulePath = type === 'local'
                        ? `modules/${path}`
                        : path;

                    if (config.nuxt.aliases) {
                        const { aliases } = config.nuxt;

                        Object.keys(aliases).forEach((alias) => {
                            config.nuxt.aliases[alias] = `/${modulePath}${aliases[alias]}`;
                        });
                    }
                    modulesConfig.nuxt = deepmerge(modulesConfig.nuxt, config.nuxt);
                }
                return modulesConfig;
            }, this._inactiveModulesConfig);
        },
        checkRequiredModules() {
            this._requiredModules.forEach((module) => {
                if (!this._modules.active || !this._modules.active.includes(module)) {
                    throw Error(`Module [${module}] does not exist.`);
                }
            });
        },
        checkModuleRelations() {
            const { moduleRelations: modulesRelations } = this._modulesConfig;

            modulesRelations.forEach((moduleRelations) => {
                const { moduleName, relations } = moduleRelations;

                relations.forEach((relation) => {
                    if (!this._modules.active || !this._modules.active.includes(moduleName)) {
                        throw Error(`Module [${moduleName}] has relation with [${relation}].\n Module [${relation}] does not exist.`);
                    }
                });
            });
        },
        inactiveModulesInfo() {
            if (this._modules.inactive) {
                const { inactive } = this._modules;
                Object.keys(inactive).forEach((module) => {
                    console.info(`Module [${inactive[module]}] is inactive.`);
                });
            }
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

export const { modulesConfig, inactiveModulesConfig } = ModuleLoader;
