/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div :class="['divider', {'divider--vertical': props.vertical}]" />
</template>

<script>
export default {
    name: 'Divider',
    props: {
        vertical: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .divider {
        background-color: $GREY_LIGHT;

        &:not(&--vertical) {
            height: 1px;
        }

        &--vertical {
            width: 1px;
        }
    }
</style>
