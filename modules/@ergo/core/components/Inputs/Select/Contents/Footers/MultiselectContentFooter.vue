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
            title="CLEAR ALL"
            @click.native="onClear" />
    </ContentBaseFooter>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import ContentBaseFooter from '@Core/components/Inputs/Select/Contents/Footers/ContentBaseFooter';
import Button from '@Core/components/Buttons/Button';

export default {
    name: 'MultiselectContentFooter',
    components: {
        ContentBaseFooter,
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
