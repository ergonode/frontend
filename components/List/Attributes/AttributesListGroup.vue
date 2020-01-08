/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListGroupElement
        :index="group.key"
        :title="group.value"
        :subtitle="elementsCount"
        :hint="group.value ? `${group.key} ${languageCode}` : ''"
        :is-expanded="isExpanded"
        @group="getElementsForGroupWrapper">
        <template #item>
            <AttributesListElement
                v-for="item in elementsByGroupInLanguage"
                :key="item.id"
                :item="item"
                :is-draggable="isDraggable"
                :language-code="languageCode" />
        </template>
    </ListGroupElement>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { UNASSIGNED_GROUP_ID } from '~/defaults/list';

export default {
    name: 'AttributesListGroup',
    components: {
        ListGroupElement: () => import('~/core/components/List/ListGroupElement'),
        AttributesListElement: () => import('~/components/List/Attributes/AttributesListElement'),
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
        isDraggable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('list', {
            groups: (state) => state.groups,
            groupsElementsCount: (state) => state.groupsElementsCount,
            elements: (state) => state.elements,
        }),
        elementsByGroupInLanguage() {
            if (!this.elements[this.languageCode]
                || this.elements[this.languageCode].length === 0) return [];

            return this.elements[this.languageCode].filter(
                (element) => (element.groups.length === 0 && this.group.id === UNASSIGNED_GROUP_ID)
                    || element.groups.some((group) => group === this.group.id),
            );
        },
        elementsCount() {
            return `${this.groupsElementsCount[this.group.id] || 0} Attributes`;
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
                    languageCode: this.languageCode,
                });
            }

            this.$emit('expandGroup', id);
        },
    },
};
</script>
