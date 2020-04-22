/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <button @click="onClick">
        Click me!
    </button>
</template>

<script>
import Vue from 'vue';
import Dropdown from './Dropdown';

const ComponentClass = Vue.extend(Dropdown);
const instance = new ComponentClass({});

export default {
    name: 'Test',
    mounted() {
        const app = document.documentElement.querySelector('.app');
        instance.$slots.default = [this.$scopedSlots.test()];
        instance.$mount();
        app.appendChild(instance.$el);
    },
    methods: {
        onClick() {
            instance.$props.text = 'Awww! I changed your prop!';
        },
    },
};
</script>
