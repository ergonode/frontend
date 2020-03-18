/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="title-bar">
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
                        <IconLock
                            size="24"
                            :fill-color="color" />
                    </template>
                </InformationIconBadge>
            </template>
        </TitleBarHeader>
        <TitleBarActions>
            <slot name="subActions" />
            <slot name="mainAction" />
        </TitleBarActions>
    </div>
</template>

<script>
import { WHITE, BLUE, GREEN } from '@Core/assets/scss/_js-variables/colors.scss';
import TitleBarHeader from '@Core/components/TitleBar/TitleBarHeader';
import TitleBarActions from '@Core/components/TitleBar/TitleBarActions';
import Fab from '@Core/components/Buttons/Fab';

export default {
    name: 'TitleBar',
    components: {
        TitleBarHeader,
        TitleBarActions,
        Fab,
        IconLock: () => import('@Core/components/Icons/Feedback/IconLock'),
        IconArrowPointer: () => import('@Core/components/Icons/Arrows/IconArrowPointer'),
        InformationIconBadge: () => import('@Core/components/Badges/InformationIconBadge'),
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
        isNavigationBack: {
            type: Boolean,
            default: false,
        },
        isReadOnly: {
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
            this.$emit('navigateBack');
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
