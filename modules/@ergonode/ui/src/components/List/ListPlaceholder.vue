/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Placeholder
        :orientation="orientation"
        :title="title"
        :subtitle="subtitle"
        :bg-url="bgUrl"
        :color="color">
        <template #action>
            <slot name="action" />
        </template>
    </Placeholder>
</template>

<script>
import {
    ORIENTATION,
} from '@Core/defaults/layout';
import {
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Placeholder from '@UI/components/Placeholder/Placeholder';

export default {
    name: 'ListPlaceholder',
    components: {
        Placeholder,
    },
    props: {
        /**
         * Determines position of body components; vertical / horizontal
         */
        orientation: {
            type: String,
            default: ORIENTATION.VERTICAL,
            validator: value => Object.values(ORIENTATION).indexOf(value) !== -1,
        },
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * The subtitle of the component
         */
        subtitle: {
            type: String,
            default: '',
        },
        /**
         * The url to background image of placeholder
         */
        bgUrl: {
            type: String,
            required: true,
        },
        /**
         * Color of background
         */
        color: {
            type: String,
            default: WHITESMOKE,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
    },
};
</script>

<style lang="scss" scoped>
    .placeholder {
        min-height: 280px;
        box-shadow: $ELEVATOR_2_DP;
    }
</style>
