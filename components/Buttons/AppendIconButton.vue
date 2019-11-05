/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseButton
        v-bind="$attrs">
        <template #append="{ color }">
            <div :class="appendClasses">
                <slot
                    name="append"
                    :color="color" />
            </div>
        </template>
        <slot />
    </BaseButton>
</template>
<script>
import BaseButton from '~/components/Buttons/BaseButton';

export default {
    name: 'AppendIconButton',
    inheritAttrs: false,
    components: {
        BaseButton,
    },
    computed: {
        appendClasses() {
            return this.$attrs.title ? `btn__append--${this.$attrs.size}` : null;
        },
    },
};
</script>
<style lang="scss" scoped>
    .btn__append {
        &--regular {
            margin: 0 -6px 0 6px;
        }

        &--small {
            margin: 0 -4px 0 4px;
        }

        &--tiny {
            margin: 0 -4px 0 2px;
        }
    }
</style>
