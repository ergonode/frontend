/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ul>
        <ListElement
            large
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
            <div v-if="isExpanded">
                <slot name="item" />
            </div>
        </FadeTransition>
    </ul>
</template>

<script>
import { ARROW } from '~/defaults/icons';
import ListElementDescription from '~/core/components/List/ListElementDescription';
import ListElementTitle from '~/core/components/List/ListElementTitle';
import ListElementHint from '~/core/components/List/ListElementHint';

export default {
    name: 'ListGroupElement',
    components: {
        ListElementAction: () => import('~/core/components/List/ListElementAction'),
        ListElement: () => import('~/core/components/List/ListElement'),
        ListElementDescription,
        ListElementTitle,
        ListElementHint,
        IconArrowSingle: () => import('~/components/Icon/Arrows/IconArrowSingle'),
        FadeTransition: () => import('~/core/components/Transitions/FadeTransition'),
    },
    props: {
        index: {
            type: String,
            default: null,
        },
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
        iconState() {
            return this.isExpanded
                ? ARROW.UP
                : ARROW.DOWN;
        },
    },
    methods: {
        expandGroup() {
            if (!this.isExpanded) {
                this.$emit('group', this.index);
            } else {
                this.$emit('group');
            }
        },
    },
};
</script>
