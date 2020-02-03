/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ContentBaseFooter
        :small="true"
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
    </ContentBaseFooter>
</template>

<script>
import { SIZES, THEMES } from '@Core/defaults/buttons';
import ContentBaseFooter from '@Core/components/Inputs/Select/Contents/Footers/ContentBaseFooter';
import Button from '@Core/components/Buttons/Button';

export default {
    name: 'SelectContentFooter',
    components: {
        ContentBaseFooter,
        Button,
    },
    methods: {
        onClear() {
            this.$emit('clear');
        },
        onApply() {
            this.$emit('apply');
        },
    },
    computed: {
        tinySize() {
            return SIZES.TINY;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
};
</script>
