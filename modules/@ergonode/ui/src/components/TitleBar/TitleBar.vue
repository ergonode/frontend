/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <header
        class="title-bar"
        data-cy="title-bar">
        <TitleBarHeader :title="title">
            <template #prepend>
                <slot name="prependHeader" />
            </template>
            <template #append>
                <slot name="prependBadge" />
                <ReadOnlyBadge v-if="isReadOnly" />
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
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'TitleBar',
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
