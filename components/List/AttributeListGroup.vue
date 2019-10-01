/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListGroupElement
        :index="group.id"
        :title="group.label"
        :subtitle="groupSubtitle"
        :is-expanded="isExpanded"
        @group="getElementsForGroupWrapper">
        <template #item>
            <AttributeListElement
                v-for="item in elementsByGroupInLanguage"
                :key="item.id"
                :item="item"
                :language-code="languageCode" />
        </template>
    </ListGroupElement>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { UNASSIGNED_GROUP_ID } from '~/defaults/list/main';

export default {
    name: 'AttributeListGroup',
    components: {
        ListGroupElement: () => import('~/components/List/ListGroupElement'),
        AttributeListElement: () => import('~/components/List/AttributeListElement'),
    },
    props: {
        group: {
            type: Object,
            required: true,
        },
        languageCode: {
            type: String,
            required: true,
        },
        isExpanded: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('list', {
            groups: (state) => state.groups,
            elements: (state) => state.elements,
            groupElementsCount: (state) => state.groupElementsCount,
        }),
        elementsByGroupInLanguage() {
            if (!this.elements[this.languageCode]
                || this.elements[this.languageCode].length === 0) return [];

            return this.elements[this.languageCode].filter(
                (element) => (element.groups.length === 0 && this.group.id === UNASSIGNED_GROUP_ID)
                    || element.groups.some((group) => group === this.group.id),
            );
        },
        groupSubtitle() {
            return `${this.groupElementsCount[this.group.id]} Attributes`;
        },
    },
    methods: {
        ...mapActions('list', [
            'getElementsForGroup',
        ]),
        getElementsForGroupWrapper(id = '') {
            if (!this.isExpanded) {
                this.getElementsForGroup({
                    listType: 'attributes',
                    groupId: this.group.id,
                    elementsCount: this.group.elementsCount,
                    languageCode: this.languageCode,
                });
            }

            this.$emit('expandedGroup', id);
        },
    },
};
</script>
