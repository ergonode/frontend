/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="menu-section">
        <MenuListHeader
            v-if="title"
            :title="title" />
        <ul class="menu-section__list">
            <MenuListElement
                v-for="(item, index) in visibleMenu"
                :key="index"
                :item="item" />
        </ul>
    </div>
</template>

<script>

export default {
    name: 'MenuList',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: null,
        },
        /**
         * List of menu items
         */
        menu: {
            type: Array,
            required: true,
        },
    },
    computed: {
        visibleMenu() {
            return this.menu.filter(({
                privileges = null,
            }) => {
                if (!privileges) return true;

                return this.$hasAccess(privileges);
            });
        },
    },
};
</script>

<style lang="scss">
    .menu-section {
        &:not(:nth-child(1)) {
            border-top: 1px solid rgba( $GREY, 0.5 );
        }

        &__title {
            position: relative;
            padding: 12px 16px;
            color: $GREY_DARK;
            font: $FONT_MEDIUM_12_16;
            text-align: left;
            text-transform: uppercase;
            letter-spacing: 0.5px;

            &::after {
                position: absolute;
                top: 0;
                left: 40px;
                width: 34px;
                height: 41px;
                background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, $WHITE 100%);
                transition: opacity 0.9s;
                opacity: 0;
                content: "";
            }
        }

        &__list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            padding: 0;
            list-style: none;
            overflow: hidden;
        }
    }
</style>
