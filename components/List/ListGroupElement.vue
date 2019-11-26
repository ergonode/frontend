/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="group">
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
        <div v-if="isExpanded">
            <FadeGroupTransition>
                <slot name="item" />
            </FadeGroupTransition>
        </div>
    </div>
</template>

<script>
import { ARROW } from '~/defaults/icons';

export default {
    name: 'ListGroupElement',
    components: {
        ListElementAction: () => import('~/components/List/ListElementAction'),
        ListElement: () => import('~/components/List/ListElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/components/List/ListElementTitle'),
        ListElementHint: () => import('~/components/List/ListElementHint'),
        IconArrowSingle: () => import('~/components/Icon/Arrows/IconArrowSingle'),
        FadeGroupTransition: () => import('~/components/Transitions/FadeGroupTransition'),
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
