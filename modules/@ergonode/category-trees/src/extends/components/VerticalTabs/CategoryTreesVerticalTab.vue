/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="category-vertical-tab">
        <CategoryTreesSideBar
            :disabled="disabled"
            :is-select-language="isSelectLanguage" />
        <CreateCategoryFab :floating="{ bottom: '16px', right: '16px' }" />
    </div>
</template>

<script>
import CreateCategoryFab from '@Categories/components/Buttons/CreateCategoryFab';
import CategoryTreesSideBar from '@Trees/extends/components/SideBars/CategoryTreesSideBar';

export default {
    name: 'CategoryTreesVerticalTab',
    components: {
        CategoryTreesSideBar,
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
    .category-trees-vertical-tab {
        position: relative;
        height: 100%;
    }
</style>
