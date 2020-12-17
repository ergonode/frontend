/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="conditions-vertical-tab">
        <LanguagesSideBar :disabled="disabled" />
    </div>
</template>

<script>
import LanguagesSideBar from '@Core/components/SideBars/LanguagesSideBar';

export default {
    name: 'ConditionsVerticalTab',
    components: {
        LanguagesSideBar,
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
