/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="title-bar">
        <TitleBarHeader :title="title">
            <template #prepend>
                <FabButton
                    v-if="isNavigationBack"
                    @click.native="onClick">
                    <template #icon="{ fillColor }">
                        <IconArrowPointer :fill-color="fillColor" />
                    </template>
                </FabButton>
            </template>
            <template #append>
                <slot name="prependBadge" />
                <InformationIconBadge
                    v-if="isReadOnly"
                    :background="blueColor"
                    :color="whiteColor"
                    title="READ ONLY">
                    <template #icon>
                        <IconLock
                            size="24"
                            :fill-color="whiteColor" />
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

export default {
    name: 'TitleBar',
    components: {
        TitleBarHeader,
        TitleBarActions,
        IconLock: () => import('@Core/components/Icons/Feedback/IconLock'),
        IconArrowPointer: () => import('@Core/components/Icons/Arrows/IconArrowPointer'),
        InformationIconBadge: () => import('@Core/components/Badges/InformationIconBadge'),
        FabButton: () => import('@Core/components/Buttons/FabButton'),
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
        onClick() {
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
