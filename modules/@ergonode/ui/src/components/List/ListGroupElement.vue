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
        <Preloader v-if="isPrefetchingData" />
    </ul>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    SIZE,
} from '@Core/defaults/theme';
import IconArrowSingle from '@UI/components/Icons/Arrows/IconArrowSingle';
import ListElement from '@UI/components/List/ListElement';
import ListElementAction from '@UI/components/List/ListElementAction';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementHint from '@UI/components/List/ListElementHint';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import Preloader from '@UI/components/Preloader/Preloader';

export default {
    name: 'ListGroupElement',
    components: {
        Preloader,
        ListElementDescription,
        ListElementTitle,
        ListElementHint,
        ListElementAction,
        ListElement,
        IconArrowSingle,
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
        /**
         * Determines if data is loaded asynchronously
         */
        isPrefetchingData: {
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
