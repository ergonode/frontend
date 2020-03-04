/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { configure } from '@storybook/vue';
import Vue from 'vue';

// TODO: Import all components and install them to Vue instance
// Import your custom components.
import List from '../modules/@ergo/core/components/List/List';

// Register custom components.
Vue.component('List', List);

function loadStories() {
    // You can require as many stories as you need.

    require('../stories');
}

configure(loadStories, module);
