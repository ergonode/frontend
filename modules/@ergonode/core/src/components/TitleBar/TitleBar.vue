/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <header class="title-bar">
        <TitleBarHeader :title="title">
            <template #prepend>
                <slot name="prependHeader" />
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
    },
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            required: true,
        },
        /**
         * Determines if the context is read only
         */
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
