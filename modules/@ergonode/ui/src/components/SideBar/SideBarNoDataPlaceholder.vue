/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Placeholder
        :title="title"
        :orientation="horizontalOrientation"
        :subtitle="subtitle"
        :size="smallSize">
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
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'SideBarNoDataPlaceholder',
    props: {
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
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        horizontalOrientation() {
            return ORIENTATION.HORIZONTAL;
        },
    },
    methods: {
        onClearSearch() {
            this.$emit('clear');
        },
    },
};
</script>
