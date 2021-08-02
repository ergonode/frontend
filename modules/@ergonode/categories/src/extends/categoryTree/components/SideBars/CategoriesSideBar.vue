/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SideBar
        :title="$t('@Categories.category._.title')"
        :items="categoriesByLanguage"
        :searchable="true"
        :search-value="searchValue"
        @search="onSearch">
        <template #body>
            <Preloader v-if="isPrefetchingData" />
        </template>
        <template #noDataPlaceholder>
            <SideBarNoDataPlaceholder
                :title="$t('@Categories.category._.noItems')"
                :subtitle="$t('@Categories.category._.createFirst')">
                <template #action>
                    <CreateCategoryButton />
                </template>
            </SideBarNoDataPlaceholder>
        </template>
        <template #item="{ item }">
            <CategorySideBarElement
                :scope="scope"
                :item="item"
                :dragging-element-type="draggingElementType"
                :language-code="languageCode"
                :disabled="disabled" />
        </template>
    </SideBar>
</template>

<script>
import CreateCategoryButton from '@Categories/components/Buttons/CreateCategoryButton';
import {
    CATEGORY_CREATED_EVENT_NAME,
} from '@Categories/defaults/attributes';
import CategorySideBarElement from '@Categories/extends/categoryTree/components/SideBars/CategorySideBarElement';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    deepClone,
} from '@Core/models/objectWrapper';
import {
    getItems,
} from '@Core/services/sidebar';
import debounce from 'debounce';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CategoriesSideBar',
    components: {
        CreateCategoryButton,
        CategorySideBarElement,
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
    async fetch() {
        await this.getItems();

        this.isPrefetchingData = false;
    },
    data() {
        return {
            isPrefetchingData: true,
            categories: {},
            categoriesBeforeSearch: {},
            searchValue: '',
            onDebounceGetItems: null,
        };
    },
    computed: {
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        categoriesByLanguage() {
            return this.categories[this.languageCode] || [];
        },
    },
    created() {
        this.onDebounceGetItems = debounce(this.getItems, 500);
    },
    mounted() {
        document.documentElement.addEventListener(
            CATEGORY_CREATED_EVENT_NAME,
            this.onCategoryCreated,
        );
    },
    beforeDestroy() {
        this.removeDisabledScopeElements(this.scope);

        document.documentElement.removeEventListener(
            CATEGORY_CREATED_EVENT_NAME,
            this.onCategoryCreated,
        );
    },
    methods: {
        ...mapActions('list', [
            'removeDisabledScopeElements',
        ]),
        async onCategoryCreated() {
            await this.getItems();
        },
        async getItems() {
            const params = {
                limit: 99999,
                offset: 0,
                view: 'list',
                field: 'code',
                order: 'ASC',
            };

            if (this.searchValue !== '') {
                params.filter = `code=${this.searchValue}`;
            }

            await getItems({
                $axios: this.$axios,
                languageCode: this.languageCode,
                path: `${this.languageCode}/categories`,
                params,
                onSuccess: this.getItemsSuccess,
            });
        },
        getItemsSuccess({
            items,
            languageCode,
        }) {
            this.categories = {
                ...this.categories,
                [languageCode]: items,
            };
        },
        async onSearch(value) {
            if (this.searchValue === '') {
                this.categoriesBeforeSearch = deepClone(this.categories);
            }

            this.searchValue = value;

            if (value !== '') {
                this.onDebounceGetItems();
            } else {
                this.categories = deepClone(this.categoriesBeforeSearch);
                this.categoriesBeforeSearch = {};
            }
        },
    },
};
</script>
