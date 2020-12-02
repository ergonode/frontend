/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <IconSearch :fill-color="searchIconFillColor" />
        <input
            class="select-list-search__input"
            :value="value"
            type="text"
            :placeholder="placeholder"
            @focus="onSearchFocus"
            @blur="onSearchFocusLost"
            @input="debouncedSearch"
            @click.stop>
    </div>
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
    name: 'SelectListSearch',
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
         * The placeholder is a helper text for the component
         */
        placeholder: {
            type: String,
            default: 'Search...',
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
                'select-list-search',
                `select-list-search--${this.size}`,
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
    .select-list-search {
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
            margin-left: 4px;
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
