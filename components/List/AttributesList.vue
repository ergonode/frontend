/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <List>
        <div class="group-wrapper">
            <AttributeListGroup
                v-for="(group, index) in groups[languageCode]"
                :key="index"
                :group="group"
                :language-code="languageCode"
                :is-expanded="expendedGroupId === group.id"
                @expandedGroup="setExpandedGroupID" />
        </div>
    </List>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'AttributesList',
    components: {
        List: () => import('~/components/List/List'),
        AttributeListGroup: () => import('~/components/List/AttributeListGroup'),
    },
    props: {
        languageCode: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            expendedGroupId: '',
        };
    },
    watch: {
        languageCode() {
            this.expendedGroupId = '';
        },
    },
    computed: {
        ...mapState('list', {
            groups: (state) => state.groups,
        }),
    },
    methods: {
        setExpandedGroupID(id) {
            this.expendedGroupId = id;
        },
    },
};
</script>

<style lang="scss" scoped>
    .group-wrapper {
        height: 0;
    }
</style>
