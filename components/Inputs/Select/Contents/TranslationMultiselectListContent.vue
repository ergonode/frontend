/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <List>
        <CheckBoxElement
            v-for="(option, index) in options"
            :key="index"
            small
            :description="option.key"
            :selected-value="getSelectedValueByOption(option)"
            @value="onSelectedValue">
            <template #description>
                <ListElementDescription>
                    <ListElementSubtitle
                        small
                        :subtitle="option.key" />
                    <ListElementTitle
                        small
                        :title="option.value || 'No translation'"
                        :color="getSelectedColor(option.key)" />
                </ListElementDescription>
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
        ListElementTitle: () => import('~/components/List/ListElementTitle'),
        ListElementSubtitle: () => import('~/components/List/ListElementSubtitle'),
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
                localSelectedOptions = [...this.selectedOptions, option];
            } else {
                localSelectedOptions = this.selectedOptions.filter(opt => opt !== option);
            }

            this.$emit('values', localSelectedOptions);
        },
        getSelectedValueByOption(option) {
            const index = this.selectedOptions.findIndex(opt => opt === option.key);

            return index !== -1;
        },
        getSelectedColor(option) {
            return String(this.selectedOption) === option
                ? 'txt--dark-graphite'
                : 'txt--graphite';
        },
    },
};
</script>
