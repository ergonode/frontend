/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DropdownFooter
        :size="size"
        :space-between="spaceBetween">
        <Button
            :theme="secondaryTheme"
            :size="tinySize"
            title="CLEAR"
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
    name: 'SelectDropdownFooter',
    components: {
        DropdownFooter,
        Button,
    },
    props: {
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.SMALL,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        /**
         * Equal space between each component
         */
        spaceBetween: {
            type: Boolean,
            default: false,
        },
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
        onClear() {
            this.$emit('clear');
        },
    },
};
</script>
