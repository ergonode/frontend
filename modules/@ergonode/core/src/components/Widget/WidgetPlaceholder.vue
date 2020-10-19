/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Placeholder
        :layout-orientation="layoutOrientation"
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
    WHITESMOKE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Placeholder from '@Core/components/Placeholder/Placeholder';
import {
    LAYOUT_ORIENTATION,
} from '@Core/defaults/layout';

export default {
    name: 'WidgetPlaceholder',
    components: {
        Placeholder,
    },
    props: {
        /**
         * Determines position of body components; vertical / horizontal
         */
        layoutOrientation: {
            type: String,
            default: LAYOUT_ORIENTATION.HORIZONTAL,
            validator: value => Object.values(LAYOUT_ORIENTATION).indexOf(value) !== -1,
        },
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: 'Nothing to see here',
        },
        /**
         * The subtitle of the component
         */
        subtitle: {
            type: String,
            default: 'There are no records in the system.',
        },
        /**
         * The url to background image of placeholder
         */
        bgUrl: {
            type: String,
            default: require('@Core/assets/images/placeholders/comments.svg'),
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
