/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <div>
            <ColorPicker
                regular
                solid
                v-model="value"/>
        </div>
    </PageWrapper>
</template>

<script>
import PageWrapper from '~/components/Layout/PageWrapper';
import ColorPicker from '~/components/Inputs/Color/ColorPicker';

export default {
    name: 'Settings',
    components: {
        PageWrapper,
        ColorPicker,
    },
    data() {
        return {
            value: null,
        };
    },
};
</script>
