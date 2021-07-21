/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Placeholder
        class="grid-no-results-placeholder"
        :title="title"
        :subtitle="subtitle"
        :orientation="horizontalOrientation"
        :bg-url="bgUrl">
        <template #action>
            <PlaceholderClearSearchButton
                title="REMOVE FILTERS"
                @click.native="onClearFilters" />
        </template>
    </Placeholder>
</template>

<script>
import {
    ORIENTATION,
} from '@Core/defaults/layout';

export default {
    name: 'GridNoResultsPlaceholder',
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
            default: 'There are no results that meet the conditions for chosen filters.',
        },
    },
    computed: {
        horizontalOrientation() {
            return ORIENTATION.HORIZONTAL;
        },
        bgUrl() {
            return require('@UI/assets/images/placeholders/woman_placeholder.svg');
        },
    },
    methods: {
        onClearFilters() {
            this.$emit('clear');
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-no-results-placeholder {
        align-self: center;
        margin-top: 48px;
        width: 640px;
        height: 328px;
    }
</style>
