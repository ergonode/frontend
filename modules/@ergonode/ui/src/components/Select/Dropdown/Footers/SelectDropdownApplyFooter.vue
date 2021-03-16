/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DropdownFooter
        :size="smallSize"
        :space-between="true">
        <Button
            :size="tinySize"
            title="OK"
            @click.native="onApply" />
        <Button
            :theme="secondaryTheme"
            :size="tinySize"
            :title="$t('core.buttons.clear')"
            @click.native="onClear" />
    </DropdownFooter>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import Button from '@UI/components/Button/Button';
import DropdownFooter from '@UI/components/Select/Dropdown/Footers/DropdownFooter';

export default {
    name: 'SelectDropdownApplyFooter',
    components: {
        DropdownFooter,
        Button,
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onClear() {
            this.$emit('clear');
        },
        onApply() {
            this.$emit('apply');
        },
    },
};
</script>
