/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DropDownFooter
        :size="smallSize"
        :space-between="true">
        <Button
            :size="tinySize"
            title="OK"
            @click.native="onApply" />
        <Button
            :theme="secondaryTheme"
            :size="tinySize"
            title="CLEAR"
            @click.native="onClear" />
    </DropDownFooter>
</template>

<script>
import Button from '@Core/components/Button/Button';
import DropDownFooter from '@Core/components/Inputs/Select/DropDown/Footers/DropDownFooter';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'SelectDropdownApplyFooter',
    components: {
        DropDownFooter,
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
