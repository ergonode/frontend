/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        v-bind="$attrs">
        <template #prepend="{ color }">
            <div :class="prependClasses">
                <slot
                    name="prepend"
                    :color="color" />
            </div>
        </template>
        <slot />
    </Button>
</template>
<script>
import Button from '~/components/Buttons/Button';

export default {
    name: 'PrependIconButton',
    inheritAttrs: false,
    components: {
        Button,
    },
    computed: {
        prependClasses() {
            const { size, title } = this.$attrs;

            if (title) {
                return size ? `btn__prepend--${size}` : 'btn__prepend--regular';
            }
            return null;
        },
    },
};
</script>
<style lang="scss" scoped>

    .btn__prepend {
        &--regular {
            margin: 0 6px 0 -6px;
        }

        &--small {
            margin: 0 4px 0 -4px;
        }

        &--tiny {
            margin: 0 2px 0 -2px;
        }
    }
</style>
