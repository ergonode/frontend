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
            <PlaceholderClearSearchButton @click.native="onClearSearch" />
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
    name: 'SideBarNoResultsPlaceholder',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: 'No results',
        },
        /**
         * The subtitle of the component
         */
        subtitle: {
            type: String,
            default: 'Clear the search and try with another phrase.',
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
