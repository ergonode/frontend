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
import IconArrowSingle from '@Core/components/Icons/Arrows/IconArrowSingle';
import ListElement from '@Core/components/List/ListElement';
import ListElementAction from '@Core/components/List/ListElementAction';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementHint from '@Core/components/List/ListElementHint';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
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
        ListElementAction,
        ListElement,
        IconArrowSingle,
        FadeTransition,
    },
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            required: true,
        },
        /**
         * The subtitle of the component
         */
        subtitle: {
            type: String,
            required: true,
        },
        /**
         *  The hint is a tip for the component
         */
        hint: {
            type: String,
            default: '',
        },
        /**
         * Determines state of expanded component
         */
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
