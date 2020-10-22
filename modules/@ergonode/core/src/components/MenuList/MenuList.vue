/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="menu-section">
        <MenuListHeader
            v-if="title"
            :title="title" />
        <ul class="menu-section__list">
            <MenuListElement
                v-for="(item, index) in menu"
                :key="index"
                :item="item" />
        </ul>
    </div>
</template>

<script>
import MenuListElement from '@Core/components/MenuList/MenuListElement';

export default {
    name: 'MenuList',
    components: {
        MenuListElement,
        MenuListHeader: () => import('@Core/components/MenuList/MenuListHeader'),
    },
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: null,
        },
        /**
         * List of menu items
         */
        menu: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss">
    @import "@Core/assets/scss/navigation/menu-list.scss";
</style>
