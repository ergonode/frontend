/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <div
            v-if="isMounted"
            ref="modalOverlay"
            data-cy="modal-overlay"
            class="modal-overlay"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp">
            <slot />
        </div>
    </FadeTransition>
</template>

<script>
export default {
    name: 'ModalOverlay',
    data() {
        return {
            isMounted: false,
            isClosed: {
                mouseUp: false,
                mouseDown: false,
            },
        };
    },
    watch: {
        isClosed: {
            deep: true,
            handler(value) {
                if (value.mouseUp && value.mouseDown) {
                    this.$emit('close');
                }
            },
        },
    },
    mounted() {
        this.isMounted = true;

        const app = document.documentElement.querySelector('.app');

        app.appendChild(this.$el);
    },
    beforeDestroy() {
        const app = document.documentElement.querySelector('.app');

        if (app.contains(this.$refs.modalOverlay)) {
            app.removeChild(this.$refs.modalOverlay);
        }
    },
    methods: {
        onMouseDown(event) {
            if (event.target.classList.contains('modal-overlay')) {
                this.isClosed.mouseDown = true;
            }
        },
        onMouseUp(event) {
            if (event.target.classList.contains('modal-overlay')) {
                this.isClosed.mouseUp = true;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: $Z_INDEX_MODAL;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: transparentize($GRAPHITE_COAL, 0.2);
    }
</style>
