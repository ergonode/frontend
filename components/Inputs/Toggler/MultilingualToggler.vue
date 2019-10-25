/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['multilingual-toggler', {'multilingual-toggler--disabled': disabled}]">
        <Toggler
            :value="value"
            :disabled="disabled"
            @input="onValueChange" />
        <span
            class="multilingual-toggler__label font--medium-s-1"
            v-text="label" />
        <InfoHint :hint="hint" />
    </div>
</template>

<script>
import Toggler from '~/components/Inputs/Toggler/Toggler';
import InfoHint from '~/components/Inputs/Hint/InfoHint';

export default {
    name: 'MultilingualToggler',
    components: {
        Toggler,
        InfoHint,
    },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
        hint: {
            type: String,
            default: '',
        },
    },
    methods: {
        onValueChange() {
            this.$emit('input', !this.value);
        },
    },
};
</script>

<style lang="scss" scoped>
    .multilingual-toggler {
        $TOGGLER: &;

        display: flex;

        &--disabled {
            #{$TOGGLER}__label {
                color: $GRAPHITE_LIGHT;
            }
        }

        &__label {
            margin-left: 8px;
            color: $GRAPHITE_DARK;
        }
    }
</style>
