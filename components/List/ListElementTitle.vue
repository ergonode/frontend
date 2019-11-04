/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        :class="['element-title', props.color, {
            'element-title--small': props.small
        }]"
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
    computed: {
        font() {
            return this.small ? 'font--medium-12-16' : 'font--medium-14-20';
        },
    },
};
</script>

<style lang="scss" scoped>
    .element-title {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        &:not(&--small) {
            font: $FONT_MEDIUM_14_20;
        }

        &--small {
            font: $FONT_MEDIUM_12_16;
        }
    }
</style>
