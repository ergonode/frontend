/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ContentBaseFooter :space-between="true">
        <BaseButton
            size="tiny"
            title="OK"
            @click.native="onApply" />
        <BaseButton
            theme="secondary"
            size="tiny"
            title="CLEAR ALL"
            @click.native="onClear" />
    </ContentBaseFooter>
</template>

<script>
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
};
</script>
