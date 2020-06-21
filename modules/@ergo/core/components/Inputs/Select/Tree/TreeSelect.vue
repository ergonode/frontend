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
        <template #option="{ option, isSelected }">
            <ListElementTree
                :level="option.level"
                :size="$attrs.size"
                :multiselect="$attrs.multiselect">
                <ListElementAction
                    v-if="$attrs.multiselect"
                    :size="$attrs.size">
                    <CheckBox
                        :value="isSelected"
                        :disabled="option.disabled" />
                </ListElementAction>
                <ListElementDescription>
                    <ListElementTitle
                        :size="$attrs.size"
                        :hint="option.hint"
                        :title="option.value || `#${option.key}`" />
                </ListElementDescription>
            </ListElementTree>
        </template>
    </Select>
</template>

<script>

import CheckBox from '@Core/components/Inputs/CheckBox';
import Select from '@Core/components/Inputs/Select/Select';
import ListElementAction from '@Core/components/List/ListElementAction';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import ListElementTree from '@Core/components/List/ListElementTree';

export default {
    name: 'TreeSelect',
    components: {
        Select,
        ListElementTree,
        ListElementAction,
        ListElementDescription,
        ListElementTitle,
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
