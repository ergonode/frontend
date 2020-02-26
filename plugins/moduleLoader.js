/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-param-reassign */
import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies

const deepmerge = require('deepmerge');

const ModuleLoader = (() => {
    let _instance;
    const _isDev = process.env.NODE_ENV === 'development';
    const _modules = require('../config/.modules').default || {};
    const { _availableModules } = require('../package');

    return {
        _modulesConfig: {
            extendTabs: [],
            dictionaries: [],
            moduleRelations: [],
            extendComponents: {},
            activeModules: {},
        },
        _inactiveModulesConfig: {
            nuxt: {},
        },
        init() {
            this.setModulesConfig(_modules.active);
            this.setInactiveModulesConfig(_modules.inactive);
            this.checkRequiredModules();
            this.checkModuleRelations();
            if (_isDev) this.inactiveModulesInfo();
        },
        install(_Vue) {
            const { extendComponents } = this._modulesConfig;

            _Vue.prototype.$getExtendedComponents = type => extendComponents[type];
        },
        get modulesConfig() {
            return this._modulesConfig;
        },
        get inactiveModulesConfig() {
            return this._inactiveModulesConfig;
        },
        configType({ type, name }) {
            switch (type) {
            case 'local':
                return require(`../modules/${name}`).default;
            case 'module':
                return require(`../modules/${name}`).config;
            // case 'npm':
                // return require(`../vendor/${name}`).config;
            default:
                return null;
            }
        },
        setModulesConfig(modules = []) {
            this._modulesConfig = modules.reduce((acc, module) => {
                const moduleType = _availableModules[module];
                const config = this.configType({ type: moduleType, name: module });
                const modulesConfig = acc;

                if (config) {
                    if (config.dictionaries) {
                        modulesConfig.dictionaries.push(...config.dictionaries);
                    }
                    // config.nuxt.chunks = {
                    //     [`${clearModuleName}Module`]: {
                    //         test(mod) {
                    //             return mod.resource && mod.resource.includes(`modules/${module}`);
                    //         },
                    //         chunks: 'all',
                    //         name: `${clearModuleName}Module`,
                    //         priority: -20,
                    //     },
                    // };
                    // modulesConfig.nuxt = deepmerge(modulesConfig.nuxt, config.nuxt);
                    if (config.moduleRelations) {
                        modulesConfig.moduleRelations.push({
                            moduleName: module,
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
                modulesConfig.activeModules[module] = moduleType;

                return modulesConfig;
            }, this._modulesConfig);
        },
        setInactiveModulesConfig(modules = []) {
            this._inactiveModulesConfig = modules.reduce((acc, module) => {
                const moduleType = _availableModules[module];
                const config = this.configType({ type: moduleType, name: module });
                const modulesConfig = acc;

                if (config && config.nuxt) {
                    const modulePath = moduleType === 'npm'
                        ? module
                        : `modules/${module}`;

                    if (config.nuxt.aliases) {
                        const { aliases } = config.nuxt;

                        Object.keys(aliases).forEach((alias) => {
                            config.nuxt.aliases[alias] = {
                                path: `${moduleType === 'npm' ? '' : '/'}${modulePath}${aliases[alias]}`.replace(/\/$/g, ''),
                                type: moduleType,
                            };
                        });
                    }
                    modulesConfig.nuxt = deepmerge(modulesConfig.nuxt, config.nuxt);
                }
                return modulesConfig;
            }, this._inactiveModulesConfig);
        },
        checkRequiredModules() {
            // _requiredModules.forEach((module) => {
            //     if (!_modules.active || !_modules.active.includes(module)) {
            //         throw Error(`Module [${module}] does not exist.`);
            //     }
            // });
        },
        checkModuleRelations() {
            // const { moduleRelations: modulesRelations } = this._modulesConfig;

            // modulesRelations.forEach((moduleRelations) => {
            //     const { name, relations } = moduleRelations;

            //     relations.forEach((relation) => {
            //         if (!_modules.active || !_modules.active.includes(name)) {
            //             throw Error(`Module [${name}] has relation with [${relation}].\n Module [${relation}] does not exist.`);
            //         }
            //     });
            // });
        },
        inactiveModulesInfo() {
            if (_modules.inactive) {
                const { inactive } = _modules;
                Object.keys(inactive).forEach((module) => {
                    console.info(`Module [${inactive[module]}] is inactive.`);
                });
            }
        },
        getInstance() {
            if (!_instance) {
                _instance = this.init();
            }
            return _instance;
        },
    };
})();

ModuleLoader.getInstance();
Vue.use(ModuleLoader);

export const { modulesConfig, inactiveModulesConfig } = ModuleLoader;
