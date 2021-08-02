/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        class="placeholder-clear-search-button"
        :title="title"
        :size="smallSize"
        :theme="secondaryTheme">
        <template #prepend="{ color }">
            <IconFilledClose :fill-color="color" />
        </template>
    </Button>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'PlaceholderClearSearchButton',
    props: {
        title: {
            type: String,
            default: 'CLEAR SEARCH',
        },
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
};
</script>

<style lang="scss" scoped>
    .placeholder-clear-search-button {
        background-color: $WHITESMOKE;
    }
</style>
