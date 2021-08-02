/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DropdownFooter :size="size">
        <Button
            :theme="secondaryTheme"
            :size="tinySize"
            :title="$t('@Core._.buttons.clear')"
            @click.native="onClear" />
    </DropdownFooter>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import DropdownFooter from '@UI/components/Select/Dropdown/Footers/DropdownFooter';

export default {
    name: 'SelectDropdownFooter',
    components: {
        DropdownFooter,

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
