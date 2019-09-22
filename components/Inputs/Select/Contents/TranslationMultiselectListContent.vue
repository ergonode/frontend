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
            @value="onSelectedValue">
            <template #checkboxDescription>
                <ListElementDescription
                    :title="option.key"
                    :subtitle="option.value || 'No translation'"
                    subtitle-typo="typo-label" />
            </template>
        </CheckBoxElement>
    </List>
</template>

<script>
export default {
    name: 'TranslationMultiselectListContent',
    components: {
        List: () => import('~/components/List/List'),
        CheckBoxElement: () => import('~/components/List/Elements/CheckBoxElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
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
        onSelectedValue({ value, option }) {
            let localSelectedOptions = [];

            if (value) {
                localSelectedOptions = [...this.selectedOptions, option.key];
            } else {
                localSelectedOptions = this.selectedOptions.filter(opt => opt !== option.key);
            }

            this.$emit('values', localSelectedOptions);
        },
        getSelectedValueByOption(option) {
            const index = this.selectedOptions.findIndex(opt => opt === option.key);

            return index !== -1;
        },
    },
};
</script>
