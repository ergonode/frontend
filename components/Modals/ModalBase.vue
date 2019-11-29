/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <div
            v-if="value"
            class="overlay">
            <div
                class="modal">
                <slot name="content" />
            </div>
        </div>
    </FadeTransition>
</template>

<script>
import FadeTransition from '~/core/components/Transitions/FadeTransition';

export default {
    name: 'ModalBase',
    components: { FadeTransition },
    props: {
        value: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999999;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        .modal {
            display: flex;
            flex-direction: column;
            max-height: 100%;
            width: 400px;
            background-color: $WHITE;
            box-shadow: $ELEVATOR_12_DP;
            overflow: auto;
        }
    }
</style>
