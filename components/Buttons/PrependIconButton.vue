/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseButton
        :disabled="disabled"
        :title="title"
        :theme="theme"
        :plain="plain"
        :size="size">
        <template #prepend="{ color }">
            <div :class="`btn__prepend--${size}`">
                <slot
                    name="prepend"
                    :color="color" />
            </div>
        </template>
        <slot />
    </BaseButton>
</template>
<script>
import buttonPropsMixin from '~/mixins/buttons/buttonPropsMixin';
import BaseButton from '~/components/Buttons/BaseButton';

export default {
    name: 'PrependIconButton',
    mixins: [buttonPropsMixin],
    components: {
        BaseButton,
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
