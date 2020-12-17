/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="languages-vertical-tab">
        <LanguagesSideBar :disabled="disabled" />
    </div>
</template>

<script>
import LanguagesSideBar from '@Core/components/SideBars/LanguagesSideBar';

export default {
    name: 'LanguagesVerticalTab',
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
    .languages-vertical-tab {
        height: 100%;
    }
</style>
