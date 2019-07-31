/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['navigation-header', { 'navigation-header__breadcrumbs': hasBreadcrumbs }]">
        <NavigationHeaderTitle
            :title="title"
            :icon="icon"
            :is-breadcrumb="breadcrumbs.length !== 0"
            @navigateback="onClick">
            <NavigationHeaderBreadcrumb
                v-for="(breadcrumb, index) in breadcrumbs"
                :key="index"
                slot="breadcrumb"
                :breadcrumb="breadcrumb" />
        </NavigationHeaderTitle>
        <div class="header-buttons-wrapper">
            <Button
                v-for="button in buttons"
                :key="button.title"
                :title="button.title"
                :color="button.color"
                :theme="button.theme"
                large
                @click.native="button.action">
                <template v-slot:prepend>
                    <IconAdd fill-color="#fff" />
                </template>
            </Button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavigationHeader',
    components: {
        NavigationHeaderTitle: () => import('~/components/ReusableHeader/NavigationHeaderTitle'),
        NavigationHeaderBreadcrumb: () => import('~/components/ReusableHeader/NavigationHeaderBreadcrumb'),
        Button: () => import('~/components/Buttons/Button'),
        IconAdd: () => import('~/components/Icon/Actions/IconAdd'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        buttons: {
            type: Array,
            default: () => [],
        },
        icon: {
            type: String,
            default: null,
        },
        breadcrumbs: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        hasBreadcrumbs() {
            return this.breadcrumbs.length > 0;
        },
    },
    methods: {
        onClick() {
            this.$emit('navigateback');
        },
    },
};
</script>

<style lang="scss" scoped>
    .navigation-header {
        display: flex;
        flex: 0 0 auto;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        padding: 0 24px;

        &__breadcrumbs {
            height: 100px;
        }

        .header-buttons-wrapper {
            display: flex;

            & > * {
                margin: 0 5px;
            }
        }
    }

</style>
