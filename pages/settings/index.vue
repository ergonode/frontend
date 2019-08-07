/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <Slider v-model="value" />
        <RangeSlider v-model="rangeValue" />
    </PageWrapper>
</template>

<script>
import PageWrapper from '~/components/Layout/PageWrapper';
import Slider from '~/components/Inputs/Slider/Slider';
import RangeSlider from '~/components/Inputs/Slider/RangeSlider';

export default {
    name: 'Settings',
    components: {
        PageWrapper,
        Slider,
        RangeSlider,
    },
    data() {
        return {
            value: 0,
            rangeValue: {
                to: 0,
                from: 0,
            },
        };
    },
};
</script>
