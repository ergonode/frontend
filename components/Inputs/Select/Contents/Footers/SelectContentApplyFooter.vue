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
            title="CLEAR"
            color="transparent"
            @click.native="onClear" />
    </ContentBaseFooter>
</template>

<script>
import ContentBaseFooter from '~/components/Inputs/Select/Contents/Footers/ContentBaseFooter';
import Button from '~/components/Buttons/Button';

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
};
</script>
