/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Placeholder
        class="tab-bar-no-data-placeholder"
        :title="title"
        :subtitle="subtitle"
        :orientation="horizontalOrientation"
        :bg-url="bgUrl">
        <template #action>
            <slot name="action" />
        </template>
    </Placeholder>
</template>

<script>
import {
    ORIENTATION,
} from '@Core/defaults/layout';

export default {
    name: 'TabBarNoDataPlaceholder',
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
        horizontalOrientation() {
            return ORIENTATION.HORIZONTAL;
        },
        bgUrl() {
            return require('@UI/assets/images/placeholders/man_placeholder.svg');
        },
    },
};
</script>

<style lang="scss" scoped>
.tab-bar-no-data-placeholder {
    width: 640px;
    height: 328px;
}
</style>
