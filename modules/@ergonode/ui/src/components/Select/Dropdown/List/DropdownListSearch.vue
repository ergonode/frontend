/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li :class="classes">
        <input
            class="search-element__input"
            :value="value"
            type="text"
            placeholder="Search..."
            @focus="onSearchFocus"
            @blur="onSearchFocusLost"
            @input="debouncedSearch"
            @click.stop>
        <IconSearch :fill-color="searchIconFillColor" />
    </li>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    GRAPHITE,
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';
import IconSearch from '@UI/components/Icons/Actions/IconSearch';
import {
    debounce,
} from 'debounce';

export default {
    name: 'DropdownListSearch',
    components: {
        IconSearch,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: String,
            default: '',
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
    },
    data() {
        return {
            isSearchFocused: false,
        };
    },
    computed: {
        classes() {
            return [
                'search-element',
                `search-element--${this.size}`,
            ];
        },
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

        &--small {
            height: 32px;
            padding: 8px;

            #{$element}__input {
                font: $FONT_MEDIUM_12_16;

                &::placeholder {
                    font: $FONT_MEDIUM_12_16;
                }
            }
        }

        &--regular {
            height: 40px;
            padding: 12px 10px;

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
