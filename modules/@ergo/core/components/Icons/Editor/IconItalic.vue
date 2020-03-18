/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseIcon
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <path :points="points" />
    </BaseIcon>
</template>

<script>
import { GRAPHITE } from '@Core/assets/scss/_js-variables/colors.scss';
import BaseIcon from '@Core/components/Icons/BaseIcon';

export default {
    name: 'Icon',
    components: {
        BaseIcon,
    },
    props: {
        fillColor: {
            type: String,
            default: GRAPHITE,
        },
        size: {
            type: [String, Number],
            default: '24',
        },
    },
    data() {
        return {
            points: '9.96061929 5 9.96061929 7.99999665 12.1537796 7.99999665 8.75759058 16.0000033 6 16.0000033 6 19 13.9211922 19 13.9211922 16.0000033 11.7280318 16.0000033 15.1242209 7.99999665 17.881765 7.99999665 17.881765 5',
        };
    },
};
</script>
