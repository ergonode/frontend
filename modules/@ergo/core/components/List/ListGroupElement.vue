/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ul>
        <ListElement
            :size="largeSize"
            @click.native="expandGroup">
            <ListElementDescription>
                <ListElementTitle
                    :title="title"
                    :hint="hint" />
                <ListElementHint :title="subtitle" />
            </ListElementDescription>
            <ListElementAction>
                <IconArrowSingle :state="iconState" />
            </ListElementAction>
        </ListElement>
        <FadeTransition>
            <ul v-if="isExpanded">
                <slot name="item" />
            </ul>
        </FadeTransition>
    </ul>
</template>

<script>
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementHint from '@Core/components/List/ListElementHint';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'ListGroupElement',
    components: {
        ListElementDescription,
        ListElementTitle,
        ListElementHint,
        ListElementAction: () => import('@Core/components/List/ListElementAction'),
        ListElement: () => import('@Core/components/List/ListElement'),
        IconArrowSingle: () => import('@Core/components/Icons/Arrows/IconArrowSingle'),
        FadeTransition: () => import('@Core/components/Transitions/FadeTransition'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
        hint: {
            type: String,
            default: '',
        },
        isExpanded: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        largeSize() {
            return SIZE.LARGE;
        },
        iconState() {
            return this.isExpanded
                ? ARROW.UP
                : ARROW.DOWN;
        },
    },
    methods: {
        expandGroup() {
            this.$emit('expand', {
                isExpanded: !this.isExpanded,
            });
        },
    },
};
</script>
