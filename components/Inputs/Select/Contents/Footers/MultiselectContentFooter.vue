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
            title="CLEAR ALL"
            @click.native="onClear" />
    </ContentBaseFooter>
</template>

<script>
import { SIZES, THEMES } from '~/defaults/buttons';
import ContentBaseFooter from '~/components/Inputs/Select/Contents/Footers/ContentBaseFooter';
import BaseButton from '~/components/Buttons/BaseButton';

export default {
    name: 'MultiselectContentFooter',
    components: {
        ContentBaseFooter,
        BaseButton,
    },
    methods: {
        onApply() {
            this.$emit('apply');
        },
        onClear() {
            this.$emit('clear');
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
