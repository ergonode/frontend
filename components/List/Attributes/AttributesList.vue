/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <List>
        <ListScrollableContainer>
            <AttributesListGroup
                v-for="(group, index) in groups[languageCode]"
                :key="index"
                :group="group"
                :language-code="languageCode"
                :is-expanded="expendedGroup === group.key"
                @expandGroup="setExpandedGroup" />
        </ListScrollableContainer>
    </List>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'AttributesList',
    components: {
        List: () => import('@Core/components/List/List'),
        ListScrollableContainer: () => import('@Core/components/List/ListScrollableContainer'),
        AttributesListGroup: () => import('~/components/List/Attributes/AttributesListGroup'),
    },
    props: {
        languageCode: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            expendedGroup: '',
        };
    },
    created() {
        this.setDefaultExpandedGroup();
    },
    watch: {
        languageCode() {
            this.expendedGroup = '';
        },
    },
    computed: {
        ...mapState('list', {
            groups: (state) => state.groups,
        }),
    },
    methods: {
        setExpandedGroup(key) {
            this.expendedGroup = key;
        },
        setDefaultExpandedGroup() {
            const { length } = this.groups[this.languageCode];

            if (length) {
                this.expendedGroup = this.groups[this.languageCode][length - 1].key;
            }
        },
    },
};
</script>
