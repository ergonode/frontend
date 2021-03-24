/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="categories-vertical-tab">
        <CategoriesSideBar
            :disabled="disabled"
            :is-select-language="isSelectLanguage" />
        <CreateCategoryFab :floating="{ bottom: '16px', right: '16px' }" />
    </div>
</template>

<script>
import CreateCategoryFab from '@Categories/components/Buttons/CreateCategoryFab';
import CategoriesSideBar from '@Categories/extends/categoryTree/components/SideBars/CategoriesSideBar';

export default {
    name: 'CategoriesVerticalTab',
    components: {
        CategoriesSideBar,
        CreateCategoryFab,
    },
    props: {
        isSelectLanguage: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .categories-vertical-tab {
        position: relative;
        height: 100%;
    }
</style>
