/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarButton @click.native="onClick">
        <Icon
            :icon="menuIcon"
            size="medium" />
    </NavigationBarButton>
</template>

<script>
export default {
    name: 'NavigationBarMenuButton',
    components: {
        NavigationBarButton: () => import('~/components/Navigation/NavigationBar/NavigationBarButton'),
        Icon: () => import('~/components/Icon/Icon'),
    },
    props: {
        value: {
            type: Number,
            required: true,
        },
    },
    computed: {
        menuIcon() {
            switch (this.value) {
            case 2:
                return 'sprite-navbar navbar-menu-icons';
            case 1:
                return 'sprite-navbar navbar-menu-hidden';
            default:
                return 'sprite-navbar navbar-menu-full';
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
