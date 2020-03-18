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
                :fill-color="whiteColor"
                size="48" />
            <span class="trash-can__label font--semi-bold-14-16">drop here to remove</span>
        </div>
    </div>
</template>

<script>
import {
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'TrashCan',
    components: {
        IconDelete: () => import('@Core/components/Icons/Actions/IconDelete'),
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
    },
    methods: {
        drop(event) {
            event.preventDefault();

            if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
                // TODO: Only Firefox Error: Modifications are not allowed for this document
                // check why firefox does not support clearData
                event.dataTransfer.clearData();
            }
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
        z-index: $Z_INDEX_TRASH;
        width: 480px;
        height: 480px;
        background-color: $GRAPHITE_DARK;
        box-shadow: $ELEVATOR_12_DP;
        border-radius: 240px;
        animation: pulse 2s infinite;

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

        &__label {
            color: $WHITE;
            text-transform: uppercase;
        }
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.9);
        }

        70% {
            box-shadow: 0 0 0 40px rgba(0, 0, 0, 0);
        }

        100% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        }
    }
</style>
