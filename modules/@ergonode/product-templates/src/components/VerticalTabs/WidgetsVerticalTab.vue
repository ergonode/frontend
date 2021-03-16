/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="widgets-vertical-tab">
        <WidgetsSideBar :disabled="disabled" />
    </div>
</template>

<script>
import WidgetsSideBar from '@Templates/components/SideBars/WidgetsSideBar';

export default {
    name: 'WidgetsVerticalTab',
    components: {
        WidgetsSideBar,
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .widgets-vertical-tab {
        height: 100%;
    }
</style>
