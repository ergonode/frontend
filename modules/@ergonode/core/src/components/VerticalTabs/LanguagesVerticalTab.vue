/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="languages-vertical-tab">
        <LanguagesSideBar
            :scope="scope"
            :disabled="disabled"
            :dragging-element-type="draggingElementType" />
    </div>
</template>

<script>
import LanguagesSideBar from '@Core/components/SideBars/LanguagesSideBar';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';

export default {
    name: 'LanguagesVerticalTab',
    components: {
        LanguagesSideBar,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Type of the place from where element is dragging
         */
        draggingElementType: {
            type: String,
            default: DRAGGED_ELEMENT.LIST,
        },
    },
};
</script>

<style lang="scss" scoped>
    .languages-vertical-tab {
        height: 100%;
    }
</style>
