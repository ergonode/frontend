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
        <template #item="{ item, isSelected }">
            <ListElementTree
                :level="item.level"
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
                        :hint="item.hint"
                        :title="item.value || `#${item.key}`" />
                </ListElementDescription>
            </ListElementTree>
        </template>
    </Select>
</template>

<script>

import CheckBox from '@UI/components/CheckBox/CheckBox';
import ListElementAction from '@UI/components/List/ListElementAction';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import ListElementTree from '@UI/components/List/ListElementTree';
import Select from '@UI/components/Select/Select';

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
