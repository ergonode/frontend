/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
        <template #dropdownBody>
            <slot name="dropdownBody" />
        </template>
        <template #noDataPlaceholder>
            <slot name="noDataPlaceholder" />
        </template>
        <template #noResultsPlaceholder>
            <slot name="noResultsPlaceholder" />
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

/**
 * @deprecated since 1.1.0
 */
export default {
    name: 'TranslationSelect',
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
