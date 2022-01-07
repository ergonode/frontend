/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="category-trees-vertical-tab">
        <CategoryTreesSideBar
            :scope="scope"
            :value="value"
            :on-value-change="onValueChange" />
        <CreateCategoryFab
            v-if="isAddingEnabled"
            :floating="{ bottom: '16px', right: '16px' }" />
    </div>
</template>

<script>
import CreateCategoryFab from '@Categories/components/Buttons/CreateCategoryFab';
import CategoryTreesSideBar from '@Trees/extends/product/components/SideBars/CategoryTreesSideBar';

export default {
    name: 'CategoryTreesVerticalTab',
    components: {
        CategoryTreesSideBar,
        CreateCategoryFab,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        value: {
            type: Object,
            default: () => ({}),
        },
        isAddingEnabled: {
            type: Boolean,
            default: true,
        },
        onValueChange: {
            type: Function,
            default: () => {},
        },
    },
};
</script>

<style lang="scss" scoped>
    .category-trees-vertical-tab {
        position: relative;
        height: 100%;
    }
</style>
