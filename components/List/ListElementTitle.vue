/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        :class="['element-title', props.color, {'element-title--small': props.small}]"
        v-text="props.title" />
</template>

<script>
export default {
    name: 'ListElementTitle',
    props: {
        title: {
            type: String,
            required: true,
        },
        small: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default: 'txt--dark-graphite',
        },
    },
};
</script>

<style lang="scss" scoped>
    .element-title {
        flex: 0 1 auto;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        &:not(&--small) {
            @include setFont(medium, regular, semiRegular);
        }

        &--small {
            @include setFont(medium, small, regular);
        }
    }
</style>
