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
        <FadeTransition>
            <div v-if="isExpanded">
                <slot name="item" />
            </div>
        </FadeTransition>
    </div>
</template>

<script>
import { ARROW } from '~/defaults/icons';

export default {
    name: 'ListGroupElement',
    components: {
        ListElementAction: () => import('@Core/components/List/ListElementAction'),
        ListElement: () => import('@Core/components/List/ListElement'),
        ListElementDescription: () => import('@Core/components/List/ListElementDescription'),
        ListElementTitle: () => import('@Core/components/List/ListElementTitle'),
        ListElementHint: () => import('@Core/components/List/ListElementHint'),
        IconArrowSingle: () => import('~/components/Icon/Arrows/IconArrowSingle'),
        FadeTransition: () => import('@Core/components/Transitions/FadeTransition'),
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
