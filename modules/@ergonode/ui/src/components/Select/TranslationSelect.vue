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
        <template #append>
            <slot name="append" />
        </template>
        <template #value>
            <span v-text="parsedValue" />
        </template>
        <template #placeholder="{ isVisible }">
            <slot
                name="placeholder"
                :is-visible="isVisible" />
        </template>
        <template #details>
            <slot name="details" />
        </template>
        <template #option="{ option, isSelected }">
            <slot
                name="option"
                :option="option"
                :selected="isSelected">
                <ListElementAction
                    v-if="$attrs.multiselect"
                    :size="$attrs.size">
                    <CheckBox :value="isSelected" />
                </ListElementAction>
                <ListElementDescription>
                    <ListElementTitle
                        :size="$attrs.size"
                        :hint="option.hint"
                        :title="option.value || `#${option.key}`" />
                </ListElementDescription>
            </slot>
        </template>
    </Select>
</template>

<script>
import CheckBox from '@UI/components/CheckBox/CheckBox';
import ListElementAction from '@UI/components/List/ListElementAction';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import Select from '@UI/components/Select/Select';

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
