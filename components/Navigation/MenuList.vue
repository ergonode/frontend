/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="menu-section">
        <h3
            v-if="sectionTitle"
            class="menu-section__title">
            {{ sectionTitle }}
        </h3>
        <ul class="menu-section__list">
            <MenuListElement
                v-for="(item, index) in sectionMenu"
                :key="index"
                :icon="item.icon"
                :title="item.title"
                :action="item.action"
                :selected-element="selectedElement"
            />
        </ul>
    </div>
</template>

<script>
export default {
    name: 'MenuList',
    components: {
        MenuListElement: () => import('~/components/Navigation/MenuListElement'),
    },
    props: {
        sectionTitle: {
            type: String,
            required: false,
            default: null,
        },
        sectionMenu: {
            type: Array,
            required: true,
        },
        selectedElement: {
            type: String,
            required: false,
            default: '',
        },
    },
};
</script>

<style lang="scss">
    @import "~/assets/scss/navigation/menu-list.scss";
</style>
