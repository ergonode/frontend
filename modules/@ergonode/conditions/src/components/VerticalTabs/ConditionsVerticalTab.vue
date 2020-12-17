/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="conditions-vertical-tab">
        <ConditionsSideBar :disabled="disabled" />
    </div>
</template>

<script>
import ConditionsSideBar from '@Conditions/components/SideBars/ConditionsSideBar';

export default {
    name: 'ConditionsVerticalTab',
    components: {
        ConditionsSideBar,
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
    .conditions-vertical-tab {
        height: 100%;
    }
</style>
