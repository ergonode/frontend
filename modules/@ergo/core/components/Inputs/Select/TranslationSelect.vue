/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        v-bind="$attrs"
        v-on="$listeners">
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #value>
            <span v-text="parsedValue" />
        </template>
        <template #informationLabel>
            <slot name="informationLabel" />
        </template>
        <template #option="{ option, isSelected }">
            <slot
                name="option"
                :option="option"
                :selected="isSelected">
                <ListElementAction
                    v-if="$attrs.multiselect"
                    :small="$attrs.small">
                    <CheckBox :value="isSelected" />
                </ListElementAction>
                <ListElementDescription>
                    <ListElementTitle
                        :small="$attrs.small"
                        :hint="option.hint"
                        :title="option.value || `#${option.key}`" />
                </ListElementDescription>
            </slot>
        </template>
    </Select>
</template>

<script>
import Select from '@Core/components/Inputs/Select/Select';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import ListElementAction from '@Core/components/List/ListElementAction';
import CheckBox from '@Core/components/Inputs/CheckBox';

export default {
    name: 'TranslationSelect',
    components: {
        Select,
        ListElementDescription,
        ListElementTitle,
        ListElementAction,
        CheckBox,
    },
    inheritAttrs: false,
    computed: {
        parsedValue() {
            if (!this.$attrs.value) return null;
            if (Array.isArray(this.$attrs.value)) {
                return this.$attrs.value.map(val => val.value || `#${val.key}`).join(', ');
            }
            return this.$attrs.value.value || this.$attrs.value.key;
        },
    },
};
</script>
