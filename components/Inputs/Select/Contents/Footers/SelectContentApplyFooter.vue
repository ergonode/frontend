/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ContentBaseFooter
        :small="true"
        :space-between="true">
        <BaseButton
            :size="tinySize"
            title="OK"
            @click.native="onApply" />
        <BaseButton
            :theme="secondaryTheme"
            :size="tinySize"
            title="CLEAR"
            @click.native="onClear" />
    </ContentBaseFooter>
</template>

<script>
import { SIZES, THEMES } from '~/defaults/buttons';
import ContentBaseFooter from '~/components/Inputs/Select/Contents/Footers/ContentBaseFooter';
import BaseButton from '~/components/Buttons/BaseButton';

export default {
    name: 'SelectContentFooter',
    components: {
        ContentBaseFooter,
        BaseButton,
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
