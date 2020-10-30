/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="classes"
        @mouseover="onMouseOver"
        @mouseout="onMouseOut">
        <NuxtLink
            class="menu-list-element__link"
            :to="{ path: item.routing }">
            <Component
                :is="iconComponent"
                :fill-color="iconFillColor" />
            <span
                class="link-text"
                v-text="item.title" />
        </NuxtLink>
    </li>
</template>

<script>
import {
    GRAPHITE,
    GREEN,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'MenuListElement',
    props: {
        /**
         * Item data model
         */
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isHover: false,
        };
    },
    computed: {
        classes() {
            return [
                'menu-list-element',
                {
                    'menu-list-element--selected': this.isSelected,
                },
            ];
        },
        iconFillColor() {
            let iconColor = GRAPHITE;
            if (this.isHover) iconColor = GREEN;
            if (this.isSelected) iconColor = WHITE;

            return iconColor;
        },
        iconComponent() {
            return () => import(`@Core/components/Icons/Menu/Icon${this.item.icon}`);
        },
        isSelected() {
            return this.$route.path.includes(this.item.routing);
        },
    },
    methods: {
        onMouseOver() {
            if (!this.isSelected) this.isHover = true;
        },
        onMouseOut() {
            this.isHover = false;
        },
    },

};
</script>

<style lang="scss" scoped>
    .menu-list-element {
        position: relative;
        z-index: $Z_INDEX_LVL_0;
        width: 100%;
        height: 48px;
        background-color: $WHITE;
        cursor: pointer;

        &:not(&--selected) {
            &:hover {
                z-index: $Z_INDEX_NAV;
                background-color: $WHITESMOKE;
                box-shadow: $ELEVATOR_2_DP;

                span {
                    color: $GRAPHITE_DARK;
                }
            }
        }

        &__link {
            display: flex;
            align-items: center;
            height: 100%;
            text-decoration: none;
            padding: 0 24px;

            & .link-text {
                margin-left: 24px;
                color: $GRAPHITE;
                font: $FONT_MEDIUM_16_24;
                text-align: left;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
            }
        }

        &--selected {
            background-color: $GREEN;
            color: $WHITE;

            .link-text {
                color: $WHITE;
            }
        }
    }
</style>
