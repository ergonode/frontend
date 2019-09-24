/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <List>
        <ListElement
            v-for="(option, index) in options"
            :key="index"
            small
            @click.native="onSelectedValue(index)">
            <ListElementDescription>
                <ListElementSubtitle
                    small
                    :subtitle="option.key" />
                <ListElementTitle
                    small
                    :title="option.value || 'No translation'"
                    :color="getSelectedColor(option.key)" />
            </ListElementDescription>
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
        ListElementTitle: () => import('~/components/List/ListElementTitle'),
        ListElementSubtitle: () => import('~/components/List/ListElementSubtitle'),
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
