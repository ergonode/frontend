/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DropDownFooter
        :small="true"
        :space-between="true">
        <Button
            :size="tinySize"
            title="OK"
            @click.native="onApply" />
        <Button
            :theme="secondaryTheme"
            :size="tinySize"
            title="CLEAR ALL"
            @click.native="onClear" />
    </DropDownFooter>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import DropDownFooter from '@Core/components/Inputs/Select/DropDown/Footers/DropDownFooter';
import Button from '@Core/components/Buttons/Button';

export default {
    name: 'MultiselectDropdownFooter',
    components: {
        DropDownFooter,
        Button,
    },
    computed: {
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onApply() {
            this.$emit('apply');
        },
        onClear() {
            this.$emit('clear');
        },
    },
};
</script>
