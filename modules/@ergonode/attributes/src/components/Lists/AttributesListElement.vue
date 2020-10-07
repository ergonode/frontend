/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="`${item.id}/${item.code}:${languageCode}`"
        :is-draggable="isDraggable"
        :is-disabled="isDisabled"
        :hint="hint"
        :label="title"
        @drag="onDrag">
        <ListElementIcon>
            <template v-for="(formComponent, index) in typeIconComponent">
                <Component
                    :is="formComponent.component"
                    :key="index"
                    :fill-color="iconFillColor"
                    v-bind="formComponent.props" />
            </template>
        </ListElementIcon>
        <ListElementDescription>
            <ListElementTitle
                :title="title"
                :hint="hint" />
            <ListElementHint
                :title="formattedAttributeType"
                :hint="hint" />
        </ListElementDescription>
    </ListDraggableElement>
</template>

<script>
import {
    GRAPHITE,
    GREY,
} from '@Core/assets/scss/_js-variables/colors.scss';
import ListDraggableElement from '@Core/components/List/ListDraggableElement';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementHint from '@Core/components/List/ListElementHint';
import ListElementIcon from '@Core/components/List/ListElementIcon';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributesListElement',
    components: {
        ListElementDescription,
        ListElementTitle,
        ListElementHint,
        ListElementIcon,
        ListDraggableElement,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
        languageCode: {
            type: String,
            required: true,
        },
        isDraggable: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        ...mapState('list', [
            'disabledElements',
        ]),
        draggableId() {

        },
        isDisabled() {
            return this.disabledElements[this.languageCode]
                && this.disabledElements[this.languageCode][this.item.id];
        },
        iconFillColor() {
            return this.isDisabled ? GREY : GRAPHITE;
        },
        title() {
            return this.item.label || `#${this.item.code}`;
        },
        typeIconComponent() {
            const icon = this.$getExtendedFormByType({
                key: '@Attributes/components/Lists/AttributeListElement/Icon',
                type: this.item.type,
            });

            if (!icon.length) {
                return [
                    {
                        component: () => import('@Core/components/Icons/Menu/IconAttributes'),
                    },
                ];
            }

            return icon;
        },
        formattedAttributeType() {
            return capitalizeAndConcatenationArray(this.item.type.split('_'));
        },
        hint() {
            return this.item.label ? `#${this.item.code} ${this.languageCode}` : '';
        },
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        onDrag(isDragged) {
            this.__setState({
                key: 'draggedElement',
                value: isDragged ? `${this.item.code}:${this.languageCode}` : null,
            });
        },
    },
};
</script>
