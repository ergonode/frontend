/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Fab
        :theme="secondaryTheme"
        @click.native="onActivate">
        <template #icon>
            <IconGrid :fill-color="fillColor" />
        </template>
    </Fab>
</template>

<script>
import { GRAPHITE, GREEN } from '@Core/assets/scss/_js-variables/colors.scss';
import Fab from '@Core/components/Buttons/Fab';
import IconGrid from '@Core/components/Icons/Others/IconGrid';
import { GRID_LAYOUT } from '@Core/defaults/grid';
import { THEME } from '@Core/defaults/theme';

export default {
    name: 'GridCollectionLayoutActivator',
    components: {
        Fab,
        IconGrid,
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
            this.$emit('active', GRID_LAYOUT.COLLECTION);
        },
    },
};
</script>
