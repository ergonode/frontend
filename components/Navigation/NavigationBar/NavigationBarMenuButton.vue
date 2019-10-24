/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarButton @click.native="onClick">
        <Component
            :is="menuIconComponent"
            :fill-color="whiteColor"
            :state="leftDoubleArrow" />
    </NavigationBarButton>
</template>

<script>
import { Arrow } from '~/model/icons/Arrow';
import { WHITE } from '~/assets/scss/_variables/_colors.scss';
import IconHamburgerList from '~/components/Icon/Menu/IconHamburgerList';
import IconArrowDouble from '~/components/Icon/Arrows/IconArrowDouble';
import IconHamburger from '~/components/Icon/Menu/IconHamburger';

export default {
    name: 'NavigationBarMenuButton',
    components: {
        NavigationBarButton: () => import('~/components/Navigation/NavigationBar/NavigationBarButton'),
    },
    props: {
        value: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            leftDoubleArrow: Arrow.LEFT,
        };
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
        menuIconComponent() {
            switch (this.value) {
            case 2:
                return IconHamburgerList;
            case 1:
                return IconArrowDouble;
            default:
                return IconHamburger;
            }
        },
    },
    methods: {
        onClick() {
            const newState = this.value > 0 ? this.value - 1 : 2;

            this.$emit('state', newState);
        },
    },
};
</script>
