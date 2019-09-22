/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        :class="['info-cell', {'info-cell--fixed-width': props.fixedWidth}]"
        v-text="props.value" />
</template>

<script>

export default {
    name: 'GridInfoCell',
    props: {
        value: {
            type: [String, Number],
            required: true,
        },
        fixedWidth: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .info-cell {
        @include setFont(medium, small, regular, $darkGraphite);

        flex: 1;
        width: 0;
        padding: 8px;
        user-select: none;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        &--fixed-width {
            width: min-content;
        }
    }
</style>
