/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Fab
        :theme="secondaryTheme"
        @click.native="onActivate">
        <template #icon>
            <IconListMedium :fill-color="fillColor" />
        </template>
    </Fab>
</template>

<script>
import {
    GRAPHITE,
    GREEN,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Fab from '@Core/components/Fab/Fab';
import IconListMedium from '@Core/components/Icons/Others/IconListMedium';
import {
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import {
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'GridTableLayoutActivator',
    components: {
        Fab,
        IconListMedium,
    },
    props: {
        isSelected: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        fillColor() {
            return this.isSelected ? GREEN : GRAPHITE;
        },
    },
    methods: {
        onActivate() {
            this.$emit('active', GRID_LAYOUT.TABLE);
        },
    },
};
</script>
