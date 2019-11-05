/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ContentBaseFooter :small="true">
        <BaseButton
            theme="secondary"
            size="tiny"
            title="CLEAR"
            @click.native="onClear" />
    </ContentBaseFooter>
</template>

<script>
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
    },
};
</script>
