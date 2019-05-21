/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
import Ripple from './ripple';
import DraggableElement from './draggableElement';
import Visible from './visible';

const Directives = {
    install(vue) {
        vue.directive('click-outside', {
            priority: 700,
            bind: (el, binding) => {
                const element = el;
                const { bubble } = binding.modifiers;
                const handler = (e) => {
                    if (bubble || (!el.contains(e.target) && el !== e.target)) {
                        binding.value(e);
                    }
                };
                element.vueClickOutside = handler;
                document.addEventListener('click', handler);
            },
            unbind: (el) => {
                const element = el;
                document.removeEventListener('click', el.vueClickOutside);
                element.vueClickOutside = null;
            },
        });
    },
};

Ripple.zIndex = 1;

Vue.directive('ripple', Ripple);
Vue.directive('draggable-element', DraggableElement);
Vue.directive('visible', Visible);
Vue.use(Directives);
export default Directives;
