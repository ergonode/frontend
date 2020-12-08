/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
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
import Button from '@UI/components/Button/Button';
import IconFilledClose from '@UI/components/Icons/Window/IconFilledClose';

export default {
    name: 'ClearSearchButton',
    components: {
        Button,
        IconFilledClose,
    },
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
