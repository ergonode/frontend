/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="trash-can"
        @dragover="dragOver"
        @drop="drop">
        <div class="vertical-wrapper">
            <IconDelete
                fill-color="#fff"
                size="48" />
            <Label
                class="typo-btn txt--white txt--upper l-spacing--half"
                text="drop here to remove" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'TrashCan',
    components: {
        Label: () => import('~/components/Label/Label'),
        IconDelete: () => import('~/components/Icon/Actions/IconDelete'),
    },
    methods: {
        drop(event) {
            event.dataTransfer.clearData();
        },
        dragOver(event) {
            event.preventDefault();
        },
    },
};
</script>

<style lang="scss" scoped>
    .trash-can {
        position: absolute;
        left: 5%;
        bottom: -324px;
        z-index: 9999;
        width: 480px;
        height: 480px;
        background-color: $darkGraphite;
        box-shadow:
            0 12px 17px 2px rgba(0, 0, 0, 0.14),
            0 5px 22px 4px rgba(0, 0, 0, 0.12),
            0 7px 8px -4px rgba(0, 0, 0, 0.2);
        border-radius: 240px;

        & > * {
            pointer-events: none;
        }

        .vertical-wrapper {
            margin-top: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;

            & > * {
                margin-bottom: 12px;
            }
        }
    }
</style>
