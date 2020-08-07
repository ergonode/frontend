/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <header class="title-bar">
        <TitleBarHeader :title="title">
            <template #prepend>
                <Fab
                    v-if="isNavigationBack"
                    @click.native="onBack">
                    <template #icon="{ color }">
                        <IconArrowPointer :fill-color="color" />
                    </template>
                </Fab>
            </template>
            <template #append>
                <slot name="prependBadge" />
                <InformationIconBadge
                    v-if="isReadOnly"
                    :background="blueColor"
                    :color="whiteColor"
                    title="READ ONLY">
                    <template #icon="{ color }">
                        <IconLock :fill-color="color" />
                    </template>
                </InformationIconBadge>
            </template>
        </TitleBarHeader>
        <TitleBarActions>
            <slot name="subActions" />
            <slot name="mainAction" />
        </TitleBarActions>
    </header>
</template>

<script>
import {
    BLUE,
    GREEN,
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import InformationIconBadge from '@Core/components/Badges/InformationIconBadge';
import Fab from '@Core/components/Buttons/Fab';
import IconLock from '@Core/components/Icons/Feedback/IconLock';
import TitleBarActions from '@Core/components/TitleBar/TitleBarActions';
import TitleBarHeader from '@Core/components/TitleBar/TitleBarHeader';

export default {
    name: 'TitleBar',
    components: {
        TitleBarHeader,
        TitleBarActions,
        IconLock,
        InformationIconBadge,
        Fab,
        IconArrowPointer: () => import('@Core/components/Icons/Arrows/IconArrowPointer'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            default: null,
        },
        isReadOnly: {
            type: Boolean,
            default: false,
        },
        isNavigationBack: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
        blueColor() {
            return BLUE;
        },
        greenColor() {
            return GREEN;
        },
    },
    methods: {
        onBack() {
            const {
                breadcrumbs,
            } = this.$route.meta;

            if (!breadcrumbs) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(`Route ${this.$route.fullPath} has no breadcrumbs initialised!`);
                }

                return false;
            }
            const routerPush = {
                name: breadcrumbs[breadcrumbs.length - 1].routeName,
            };

            if (breadcrumbs[breadcrumbs.length - 1].id) {
                routerPush.params = {
                    id: this.$route.params[breadcrumbs[breadcrumbs.length - 1].id],
                };
            }

            this.$router.push(routerPush);

            return true;
        },
    },
};
</script>

<style lang="scss" scoped>
    .title-bar {
        display: flex;
        flex: 0 0 auto;
        justify-content: space-between;
        align-items: center;
        min-height: 32px;
        padding: 24px;
    }
</style>
