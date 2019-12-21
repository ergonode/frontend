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
                    title="Back"
                    @click.native="onClick">
                    <template #icon="{ color }">
                        <IconArrowPointer :fill-color="color" />
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
import { WHITE, BLUE, GREEN } from '~/assets/scss/_variables/_colors.scss';
import TitleBarHeader from '@Core/components/TitleBar/TitleBarHeader';
import TitleBarActions from '@Core/components/TitleBar/TitleBarActions';
import InformationIconBadge from '@Core/components/Badges/InformationIconBadge';
import IconLock from '~/components/Icon/Feedback/IconLock';
import IconArrowPointer from '~/components/Icon/Arrows/IconArrowPointer';
import FabButton from '@Core/components/Buttons/FabButton';

export default {
    name: 'TitleBar',
    components: {
        TitleBarHeader,
        TitleBarActions,
        InformationIconBadge,
        IconLock,
        IconArrowPointer,
        FabButton,
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
