/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseButton
        :disabled="disabled"
        :title="title"
        :theme="theme"
        :size="size">
        <template #append="{ color }">
            <div :class="`btn__append--${size}`">
                <slot
                    name="append"
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
    name: 'AppendIconButton',
    mixins: [buttonPropsMixin],
    components: {
        BaseButton,
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
