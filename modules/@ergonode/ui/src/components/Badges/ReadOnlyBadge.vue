/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InformationIconBadge
        :background="blueColor"
        :color="whiteColor"
        title="READ ONLY">
        <template #icon="{ color }">
            <IconLock :fill-color="color" />
        </template>
    </InformationIconBadge>
</template>

<script>
import {
    BLUE,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'ReadOnlyBadge',
    computed: {
        whiteColor() {
            return WHITE;
        },
        blueColor() {
            return BLUE;
        },
    },
};
</script>
