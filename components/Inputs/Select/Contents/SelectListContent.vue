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
                :subtitle="option"
                subtitle-typo="typo-label"
                :subtitle-color="getSelectedColor(option)" />
        </ListElement>
    </List>
</template>

<script>
export default {
    name: 'SelectListContent',
    components: {
        List: () => import('~/components/List/List'),
        ListElement: () => import('~/components/List/ListElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
    },
    props: {
        options: {
            type: Array,
            default: () => [],
        },
        selectedOption: {
            type: [String, Number],
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
