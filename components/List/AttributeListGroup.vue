/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListGroupElement
        :index="group.id"
        :is-expanded="isExpanded"
        @group="getElementsForGroupWrapper">
        <div
            slot="headerContent"
            class="content-wrapper">
            <div class="horizontal-wrapper">
                <span
                    class="group__title"
                    v-text="group.label" />
                <span
                    class="group__subtitle"
                    v-text="`${group.elementsCount} Attributes`" />
            </div>
            <IconArrowSingle :state="iconState" />
        </div>
        <AttributeListElement
            v-for="item in elementsByGroupInLanguage"
            slot="item"
            :key="item.id"
            :item="item"
            :language-code="languageCode"
            :dragging-disabled="draggingDisabled" />
    </ListGroupElement>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Arrow } from '~/model/icons/Arrow';

export default {
    name: 'AttributeListGroup',
    components: {
        ListGroupElement: () => import('~/components/List/ListGroupElement'),
        AttributeListElement: () => import('~/components/List/AttributeListElement'),
        IconArrowSingle: () => import('~/components/Icon/Arrows/IconArrowSingle'),
    },
    props: {
        group: {
            type: Object,
            required: true,
        },
        draggingDisabled: {
            type: Boolean,
            required: true,
        },
        languageCode: {
            type: String,
            required: true,
        },
        isExpanded: {
            type: Boolean,
            required: false,
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
        iconState() {
            return this.isExpanded
                ? Arrow.UP
                : Arrow.DOWN;
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

<style lang="scss" scoped>
    .content-wrapper {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;

        .horizontal-wrapper {
            display: flex;
            flex-direction: column;
        }

        .group {
            &__title {
                @include setFont(medium, regular, semiRegular, $darkGraphite);
            }

            &__subtitle {
                @include setFont(semiBold, tiny, regular, $graphite);
            }

            &__title, &__subtitle {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
    }
</style>
