/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        v-bind="$attrs">
        <template #append="{ color }">
            <div :class="appendClasses">
                <slot
                    name="append"
                    :color="color" />
            </div>
        </template>
        <slot />
    </Button>
</template>
<script>
import Button from '@Core/components/Buttons/Button';

export default {
    name: 'AppendIconButton',
    inheritAttrs: false,
    components: {
        Button,
    },
    computed: {
        appendClasses() {
            const { size, title } = this.$attrs;

            if (title) {
                return size ? `btn__append--${size}` : 'btn__append--regular';
            }
            return null;
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
