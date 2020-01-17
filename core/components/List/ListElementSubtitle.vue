/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        :class="['element-subtitle', {
            'element-subtitle--small': props.small
        }]"
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
        color: $GRAPHITE;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        letter-spacing: 0.5px;

        &:not(&--small) {
            font: $FONT_SEMI_BOLD_12_16;
        }

        &--small {
            font: $FONT_MEDIUM_12_16;
        }
    }
</style>
