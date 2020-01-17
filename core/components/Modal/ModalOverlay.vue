/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <div
            v-if="value"
            class="dialog-overlay">
            <slot />
        </div>
    </FadeTransition>
</template>

<script>
import FadeTransition from '~/core/components/Transitions/FadeTransition';

export default {
    name: 'ModalOverlay',
    components: {
        FadeTransition,
    },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: $Z_INDEX_MODAL;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: transparentize($GRAPHITE_COAL, 0.8);
    }
</style>
