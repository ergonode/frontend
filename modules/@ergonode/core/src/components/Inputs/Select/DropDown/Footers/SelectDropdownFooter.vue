/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DropDownFooter :size="smallSize">
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
    name: 'SelectDropdownFooter',
    components: {
        DropDownFooter,
        Button,
    },
    computed: {
        tinySize() {
            return SIZE.TINY;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onClear() {
            this.$emit('clear');
        },
    },
};
</script>
