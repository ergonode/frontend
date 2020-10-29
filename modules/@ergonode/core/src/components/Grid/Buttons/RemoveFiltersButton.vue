/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        title="REMOVE FILTERS"
        :size="smallSize"
        :theme="secondaryTheme">
        <template #prepend="{ color }">
            <IconFilledClose :fill-color="color" />
        </template>
    </Button>
</template>

<script>
import Button from '@Core/components/Button/Button';
import IconFilledClose from '@Core/components/Icons/Window/IconFilledClose';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'RemoveFiltersButton',
    components: {
        Button,
        IconFilledClose,
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
