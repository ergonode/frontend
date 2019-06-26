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
import FadeTransition from '~/components/Transitions/FadeTransition';

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
        z-index: 9999999;
        top: 0;
        left: 0;
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
            background-color: $white;
            box-shadow:
                0 12px 17px 2px rgba(0, 0, 0, 0.14),
                0 5px 22px 4px rgba(0, 0, 0, 0.12),
                0 7px 8px -4px rgba(0, 0, 0, 0.2);
            overflow: auto;
        }
    }
</style>
