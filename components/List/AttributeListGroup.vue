/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListGroupElement
        :index="group.id"
        :group="group"
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
            groups: state => state.groups,
            elements: state => state.elements,
        }),
        elementsByGroupInLanguage() {
            if (!this.elements[this.languageCode]
                || this.elements[this.languageCode].length === 0) return [];

            return this.elements[this.languageCode].filter(
                element => (element.groups.length === 0 && this.group.id === null)
                    || element.groups.some(group => group === this.group.id),
            );
        },
    },
    methods: {
        ...mapActions('list', [
            'getElementsForGroup',
        ]),
        getElementsForGroupWrapper(id = '') {
            this.getElementsForGroup({
                listType: 'attributes',
                groupId: this.group.id,
                elementsCount: this.group.elementsCount,
                languageCode: this.languageCode,
            });

            this.$emit('expandedGroup', id);
        },
    },
};
</script>
