/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        :class="['element-subtitle', {'element-subtitle--small': props.small}]"
        v-text="props.subtitle" />
</template>

<script>
export default {
    name: 'ListElementSubtitle',
    props: {
        subtitle: {
            type: String,
            required: true,
        },
        small: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .element-subtitle {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        &:not(&--small) {
            @include setFont(semiBold, small, regular, $graphite, 0.5);
        }

        &--small {
            @include setFont(medium, tiny, tiny, $graphite, 0.5);
        }
    }
</style>
