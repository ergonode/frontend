/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
import Ripple from './ripple';
import DraggableElement from './draggableElement';
import Visible from './visible';
import GridNavigationable from './gridNavigationable';

Vue.directive('ripple', Ripple);
Vue.directive('draggable-element', DraggableElement);
Vue.directive('visible', Visible);
Vue.directive('grid-navigationable', GridNavigationable);
