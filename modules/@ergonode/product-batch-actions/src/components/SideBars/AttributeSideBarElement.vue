/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListDraggableElement
        :draggable-id="`${item.id}/${item.code}:${languageCode}`"
        :disabled="isDisabled"
        :hint="hint"
        :label="title"
        @drag-start="onDragStart"
        @drag-end="onDragEnd">
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
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';
import {
    GRAPHITE,
    GREY,
} from '@UI/assets/scss/_js-variables/colors.scss';
import ListDraggableElement from '@UI/components/List/ListDraggableElement';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementHint from '@UI/components/List/ListElementHint';
import ListElementIcon from '@UI/components/List/ListElementIcon';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeSideBarElement',
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
    },
    computed: {
        ...mapState('list', [
            'disabledElements',
        ]),
        isDisabled() {
            return this.disabledElements[this.languageCode]
                && this.disabledElements[this.languageCode][`${this.item.id}|${this.item.code}`];
        },
        iconFillColor() {
            return this.isDisabled ? GREY : GRAPHITE;
        },
        title() {
            return this.item.label || `#${this.item.code}`;
        },
        typeIconComponent() {
            const icon = this.$extendedForm({
                key: '@Attributes/components/Lists/AttributeListElement/Icon',
                type: this.item.type,
            });

            if (!icon.length) {
                return [
                    {
                        component: () => import('@Attributes/components/Icons/IconAttributes'),
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
        onDragStart() {
            this.__setState({
                key: 'draggedElement',
                value: {
                    id: this.item.id,
                    label: this.item.label,
                    code: this.item.code,
                    type: this.item.type,
                    languageCode: this.languageCode,
                },
            });
        },
        onDragEnd() {
            this.__setState({
                key: 'draggedElement',
                value: null,
            });
        },
    },
};
</script>
