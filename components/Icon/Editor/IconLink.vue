/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconBase
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <path :d="drawingCommands" />
    </IconBase>
</template>

<script>
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconLink',
    components: {
        IconBase,
    },
    data() {
        return {
            drawingCommands: 'M16.111099,8 C18.2577656,8 20,9.7919778 20,11.9999812 C20,14.2079847 18.2577656,16 16.111099,16 L13,16 L13,14.4800101 L16.111099,14.4800101 C17.441099,14.4800101 18.5221979,13.3679834 18.5221979,11.9999812 C18.5221979,10.6319791 17.441099,9.51998987 16.111099,9.51998987 L13,9.51998987 L13,8 L16.111099,8 Z M5.47776562,11.9999812 C5.47776562,13.3679834 6.55890104,14.4800101 7.88890104,14.4800101 L11,14.4800101 L11,16 L7.88890104,16 C5.74223437,16 4,14.2079847 4,11.9999812 C4,9.7919778 5.74223437,8 7.88890104,8 L11,8 L11,9.51998987 L7.88886458,9.51998987 C6.55886458,9.51998987 5.47776562,10.6319791 5.47776562,11.9999812 Z M9,11 L15,11 L15,13 L9,13 L9,11 Z',
            size: 24,
            fillColor: '#5C5F65',
        };
    },
};
</script>
