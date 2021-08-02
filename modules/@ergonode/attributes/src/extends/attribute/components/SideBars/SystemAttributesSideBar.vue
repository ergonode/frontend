/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SideBar
        :title="$t('@Attributes.attribute.components.SystemAttributesSideBar.title')"
        :items="attributesByLanguage"
        :searchable="true"
        :search-value="searchValue"
        @search="onSearch">
        <template #header>
            <ListSearchSelectHeader
                v-if="isSelectLanguage"
                :title="$t('@Attributes.attribute.components.SystemAttributesSideBar.title')"
                :search-value="searchValue"
                @search="onSearch">
                <template #select>
                    <LanguageTreeSelect
                        :value="languageCode"
                        @input="onSelectLanguage" />
                </template>
            </ListSearchSelectHeader>
        </template>
        <template #body>
            <Preloader v-if="isPrefetchingData" />
        </template>
        <template #item="{ item }">
            <AttributeSideBarElement
                :scope="scope"
                :item="item"
                :language-code="languageCode"
                :dragging-element-type="draggingElementType"
                :disabled="disabled" />
        </template>
    </SideBar>
</template>

<script>
import AttributeSideBarElement from '@Attributes/extends/attribute/components/SideBars/AttributeSideBarElement';
import LanguageTreeSelect from '@Core/components/Selects/LanguageTreeSelect';
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
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'SystemAttributesSideBar',
    components: {
        AttributeSideBarElement,
        LanguageTreeSelect,
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
            attributes: {},
            attributesBeforeSearch: {},
            languageCode: '',
            searchValue: '',
            onDebounceGetItems: null,
        };
    },
    computed: {
        ...mapState('authentication', {
            languagePrivileges: state => state.user.languagePrivileges,
        }),
        ...mapGetters('core', [
            'defaultLanguageCode',
        ]),
        attributesByLanguage() {
            return this.attributes[this.languageCode] || [];
        },
    },
    created() {
        this.languageCode = this.defaultLanguageCode;

        this.onDebounceGetItems = debounce(this.getItems, 500);
    },
    methods: {
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
                path: `${this.languageCode}/attributes/system`,
                params,
                onSuccess: this.getItemsSuccess,
            });
        },
        getItemsSuccess({
            items,
            languageCode,
        }) {
            this.attributes = {
                ...this.attributes,
                [languageCode]: items,
            };
        },
        async onSearch(value) {
            if (this.searchValue === '') {
                this.attributesBeforeSearch = deepClone(this.attributes);
            }

            this.searchValue = value;

            if (value !== '') {
                this.onDebounceGetItems();
            } else {
                this.attributes = deepClone(this.attributesBeforeSearch);
                this.attributesBeforeSearch = {};
            }
        },
        async onSelectLanguage(value) {
            this.languageCode = value;

            if (typeof this.attributes[value] === 'undefined') {
                this.isPrefetchingData = true;

                await this.getItems();

                this.isPrefetchingData = false;
            }
        },
    },
};
</script>
