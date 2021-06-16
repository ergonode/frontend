/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="categories-vertical-tab">
        <CategoriesSideBar
            :scope="scope"
            :disabled="disabled"
            :dragging-element-type="draggingElementType"
            :is-select-language="isSelectLanguage" />
        <CreateCategoryFab :floating="{ bottom: '16px', right: '16px' }" />
    </div>
</template>

<script>
import CreateCategoryFab from '@Categories/components/Buttons/CreateCategoryFab';
import CategoriesSideBar from '@Categories/extends/categoryTree/components/SideBars/CategoriesSideBar';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';

export default {
    name: 'CategoriesVerticalTab',
    components: {
        CategoriesSideBar,
        CreateCategoryFab,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        isSelectLanguage: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Type of the place from where element is dragging
         */
        draggingElementType: {
            type: String,
            default: DRAGGED_ELEMENT.LIST,
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
