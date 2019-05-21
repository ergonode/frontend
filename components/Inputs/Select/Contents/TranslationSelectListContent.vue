/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <List>
        <ListElement
            v-for="(option, index) in options"
            :key="index"
            @click.native="onSelectedValue(index)">
            <ListElementDescription
                :title="option.key"
                :subtitle="option.value || 'No translation'"
                subtitle-typo="typo-label" />
        </ListElement>
    </List>
</template>

<script>
export default {
    name: 'TranslationSelectListContent',
    components: {
        List: () => import('~/components/List/List'),
        ListElement: () => import('~/components/List/ListElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
    },
    props: {
        options: {
            type: Array,
            required: false,
            default: () => [],
        },
        selectedOption: {
            type: [String, Number],
            required: false,
            default: '',
        },
    },
    methods: {
        onSelectedValue(index) {
            this.$emit('value', this.options[index]);
        },
        getSelectedColor(option) {
            return String(this.selectedOption) === option
                ? 'txt--dark-graphite'
                : 'txt--graphite';
        },
    },
};
</script>

<style scoped>

</style>
