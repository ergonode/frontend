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
            <ListElementAction>
                <StatusBadge :color="colors[option.key]" />
            </ListElementAction>
            <ListElementDescription>
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
    name: 'StatusSelectListContent',
    components: {
        List: () => import('~/components/List/List'),
        ListElement: () => import('~/components/List/ListElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/components/List/ListElementTitle'),
        ListElementAction: () => import('~/components/List/ListElementAction'),
        StatusBadge: () => import('~/components/Badges/StatusBadge'),
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
        colors: {
            type: Object,
            required: true,
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

<style lang="scss" scoped>
    .status-badge {
        margin-right: 6px;
    }
</style>
