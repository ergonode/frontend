/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Placeholder
        class="widget-no-data-placeholder"
        :orientation="horizontalOrientation"
        :title="title"
        :subtitle="subtitle"
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
    name: 'WidgetNoDataPlaceholder',
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
.widget-no-data-placeholder {
    flex: 0 0 328px;
}
</style>
