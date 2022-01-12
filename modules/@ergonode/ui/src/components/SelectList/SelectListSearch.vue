/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <IconSearch :fill-color="searchIconFillColor" />
        <div :class="activatorClasses">
            <input
                class="select-list-search__input"
                :value="value"
                type="text"
                :placeholder="placeholder"
                @focus="onSearchFocus"
                @blur="onSearchFocusLost"
                @input="onSearch"
                @click.stop>
        </div>
        <IconFilledClose
            v-show="value !== ''"
            :fill-color="iconClearFillColor"
            @click.stop.native="onClear" />
    </div>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    GRAPHITE,
    GREEN,
    GREY_DARK,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'SelectListSearch',
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
        activatorClasses() {
            return [
                'select-list-search__activator',
                {
                    'select-list-search__activator--focused': this.isSearchFocused,
                },
            ];
        },
        searchIconFillColor() {
            return this.isSearchFocused || this.value !== ''
                ? GREEN
                : GRAPHITE;
        },
        iconClearFillColor() {
            return GREY_DARK;
        },
    },
    methods: {
        onClear() {
            this.$emit('input', '');
        },
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
        $search: &;

        display: flex;
        flex: 1;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;

        &--small {
            height: 32px;
            padding: 4px;

            #{$search}__input {
                font: $FONT_MEDIUM_12_16;

                &::placeholder {
                    font: $FONT_MEDIUM_12_16;
                }
            }
        }

        &--regular {
            height: 40px;
            padding: 12px 10px;

            #{$search}__input {
                font: $FONT_MEDIUM_14_20;

                &::placeholder {
                    font: $FONT_MEDIUM_14_20;
                }
            }
        }

        &__activator {
            position: relative;
            display: flex;
            flex: 1;
            width: 100%;
            margin-left: 4px;
            color: $GRAPHITE_DARK;

            input {
                flex: 1;
                width: 100%;
                border: none;
                box-sizing: border-box;
                outline: none;
                min-width: 0;

                &::placeholder {
                    opacity: 0.4;
                    color: $GRAPHITE_DARK;
                }
            }

            &::after {
                position: absolute;
                left: 0;
                bottom: -2px;
                z-index: $Z_INDEX_LVL_3;
                width: 100%;
                height: 2px;
                background-color: $GREEN;
                transform-origin: left;
                transform: scaleX(0);
                transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
                will-change: transform;
                content: "";
            }

            &--focused::after {
                transform: scaleX(1);
            }
        }
    }
</style>
