/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="navigation-header">
        <NavigationHeaderTitle
            :title="title"
            :icon="icon"
            :is-breadcrumb="breadcrumbs.length !== 0"
            @navigateback="onClick">
            <template v-slot:breadcrumb>
                <NavigationHeaderBreadcrumb
                    v-for="(breadcrumb, index) in breadcrumbs"
                    :key="index"
                    slot="breadcrumb"
                    :breadcrumb="breadcrumb" />
            </template>
            <template v-slot:badge>
                <InformationBadge
                    v-if="isReadOnly"
                    title="READ ONLY">
                    <template v-slot:prepend>
                        <IconLock
                            size="24"
                            fill-color="#fff" />
                    </template>
                </InformationBadge>
            </template>
        </NavigationHeaderTitle>
        <div class="header-buttons-wrapper">
            <Button
                v-for="button in buttons"
                :key="button.title"
                :title="button.title"
                :color="button.color"
                :theme="button.theme"
                :disabled="button.disabled"
                large
                @click.native="button.action">
                <template v-slot:prepend>
                    <IconDelete v-if="isRemoveButton(button.icon)" />
                    <IconAdd
                        v-else
                        fill-color="#fff" />
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
        InformationBadge: () => import('~/components/Badges/InformationBadge'),
        IconAdd: () => import('~/components/Icon/Actions/IconAdd'),
        IconDelete: () => import('~/components/Icon/Actions/IconDelete'),
        IconLock: () => import('~/components/Icon/Feedback/IconLock'),
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
        isReadOnly: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onClick() {
            this.$emit('navigateback');
        },
        isRemoveButton(title) {
            return !!(title && title === 'remove');
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
        padding: 24px;

        .header-buttons-wrapper {
            display: flex;

            & > * {
                margin: 0 5px;
            }
        }
    }

</style>
