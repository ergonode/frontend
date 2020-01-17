/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="['search-element', {
            'search-element--small': small,
        }]">
        <input
            class="search-element__input"
            :input="value"
            type="text"
            placeholder="Search..."
            @focus="onSearchFocus"
            @blur="onSearchFocusLost"
            @input="debouncedSearch">
        <IconSearch :fill-color="searchIconFillColor" />
    </li>
</template>

<script>
import { debounce } from 'debounce';
import {
    GREEN, GRAPHITE,
} from '~/assets/scss/_variables/_colors.scss';
import IconSearch from '~/components/Icon/Actions/IconSearch';

export default {
    name: 'DropDownListSearch',
    components: {
        IconSearch,
    },
    props: {
        value: {
            type: String,
            default: '',
        },
        small: {
            type: Boolean,
            default: false,
        },
    },
    created() {
        this.debouncedSearch = debounce(this.onSearch, 500);
    },
    destroyed() {
        delete this.debouncedSearch;
    },
    data() {
        return {
            isSearchFocused: false,
        };
    },
    computed: {
        searchIconFillColor() {
            return this.isSearchFocused
                ? GREEN
                : GRAPHITE;
        },
    },
    methods: {
        onSearch(event) {
            this.$emit('input', event.target.value);
        },
        onSearchFocusLost() {
            this.isSearchFocused = false;
            this.$emit('searchFocused', false);
        },
        onSearchFocus() {
            this.isSearchFocused = true;
            this.$emit('searchFocused', true);
        },
    },
};
</script>

<style lang="scss" scoped>
    .search-element {
        $element: &;

        display: flex;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;

        &--small {
            height: 32px;
            padding: 0 4px 0 6px;

            #{$element}__input {
                font: $FONT_MEDIUM_12_16;

                &::placeholder {
                    font: $FONT_MEDIUM_12_16;
                }
            }
        }

        &:not(&--small) {
            height: 40px;
            padding: 0 6px 0 8px;

            #{$element}__input {
                font: $FONT_MEDIUM_14_20;

                &::placeholder {
                    font: $FONT_MEDIUM_14_20;
                }
            }
        }

        &__input {
            flex: 1;
            width: 100%;
            border: none;
            outline: none;
            max-width: 100%;
            min-width: 0;
            color: $GRAPHITE_DARK;

            &::placeholder {
                opacity: 0.4;
                color: $GRAPHITE_DARK;
            }
        }
    }
</style>
