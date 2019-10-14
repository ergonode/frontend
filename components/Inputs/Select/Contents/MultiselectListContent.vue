/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <List>
        <CheckBoxElement
            v-for="(option, index) in options"
            :key="index"
            :description="option"
            :selected-value="getSelectedValueByOption(option)"
            @value="onSelectedValue" />
    </List>
</template>

<script>
import List from '~/components/List/List';
import CheckBoxElement from '~/components/List/Elements/CheckBoxElement';

export default {
    name: 'MultiselectListContent',
    components: {
        List,
        CheckBoxElement,
    },
    props: {
        options: {
            type: Array,
            default: () => [],
        },
        selectedOptions: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        getSelectedValueByOption(option) {
            const index = this.selectedOptions.findIndex((opt) => opt === option);

            return index !== -1;
        },
        onSelectedValue({ value, option }) {
            let localSelectedOptions = [];

            if (value) {
                localSelectedOptions = [...this.selectedOptions, option];
            } else {
                localSelectedOptions = this.selectedOptions.filter((opt) => opt !== option);
            }
            this.$emit('select', localSelectedOptions);
        },
    },
};
</script>
