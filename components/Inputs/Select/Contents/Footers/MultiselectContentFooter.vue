/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ContentBaseFooter
        :small="true"
        :space-between="true">
        <Button
            small
            title="OK"
            @click.native="onApply" />
        <Button
            theme="dark"
            small
            title="CLEAR ALL"
            color="transparent"
            @click.native="onClear" />
    </ContentBaseFooter>
</template>

<script>
import ContentBaseFooter from '~/components/Inputs/Select/Contents/Footers/ContentBaseFooter';
import Button from '~/components/Buttons/Button';

export default {
    name: 'MultiselectContentFooter',
    components: {
        ContentBaseFooter,
        Button,
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
