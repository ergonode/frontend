/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            :d="drawingCommands" />
    </Icon>
</template>

<script>

export default {
    name: 'IconRelation',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M19.3636 3H4.63636C3.73636 3 3 3.73636 3 4.63636V19.3636C3 20.2636 3.73636 21 4.63636 21H19.3636C20.2636 21 21 20.2636 21 19.3636V4.63636C21 3.73636 20.2636 3 19.3636 3ZM10.8464 9.68455L6.60818 5.45455L5.45455 6.60818L9.68455 10.8382L10.8464 9.68455ZM14.0455 5.45455L15.7145 7.12364L5.45455 17.3918L6.60818 18.5455L16.8764 8.28545L18.5455 9.95455L19 5L14.0455 5.45455ZM14.3155 13.1536L13.1618 14.3073L15.7227 16.8682L14.0455 18.5455L19 19L18.5455 14.0455L16.8764 15.7145L14.3155 13.1536Z';
        },
    },
};
</script>
