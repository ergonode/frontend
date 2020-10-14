/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="['search-element', {
            'search-element--small': small,
            'search-element--sticky': sticky,
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
import {
    GRAPHITE,
    GREEN,
} from '@Core/assets/scss/_js-variables/colors.scss';
import IconSearch from '@Core/components/Icons/Actions/IconSearch';
import {
    debounce,
} from 'debounce';

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
        sticky: {
            type: Boolean,
            default: false,
        },
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
    created() {
        this.debouncedSearch = debounce(this.onSearch, 500);
    },
    beforeDestroy() {
        delete this.debouncedSearch;
    },
    methods: {
        onSearch(event) {
            this.$emit('input', event.target.value);
        },
        onSearchFocusLost() {
            this.isSearchFocused = false;
        },
        onSearchFocus() {
            this.isSearchFocused = true;
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

        &--sticky {
            position: sticky;
            top: 0;
            left: 0;
            z-index: $Z_INDEX_LVL_1;
            background: $WHITE;
        }

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
