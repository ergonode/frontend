/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="['list-element', { 'list-element--selected': isSelected }]"
        @mouseover="onMouseOver"
        @mouseout="onMouseOut">
        <NuxtLink
            class="list-element__link"
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
} from '@Core/assets/scss/_js-variables/colors.scss';

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
