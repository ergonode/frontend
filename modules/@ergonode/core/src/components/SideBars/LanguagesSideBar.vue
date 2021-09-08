/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SideBar
        :title="$t('@Core.core._.systemLanguagesTitle')"
        :items="filteredLanguages"
        :searchable="true"
        :search-value="searchValue"
        @search="onSearch">
        <template #item="{ item }">
            <LanguageSideBarElement
                :item="item"
                :language-code="userLanguageCode"
                :disabled="disabled" />
        </template>
    </SideBar>
</template>

<script>
import LanguageSideBarElement from '@Core/components/SideBars/LanguageSideBarElement';
import SideBar from '@UI/components/SideBar/SideBar';
import {
    mapState,
} from 'vuex';

export default {
    name: 'LanguagesSideBar',
    components: {
        LanguageSideBarElement,
        SideBar,
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            searchValue: '',
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('core', [
            'languages',
        ]),
        filteredLanguages() {
            if (this.searchValue) {
                const rgx = new RegExp(this.searchValue, 'i');

                return this.languages.filter(
                    ({
                        code, name,
                    }) => code.match(rgx) || name.match(rgx),
                );
            }

            return this.languages;
        },
    },
    methods: {
        onSearch(value) {
            this.searchValue = value;
        },
    },
};
</script>
