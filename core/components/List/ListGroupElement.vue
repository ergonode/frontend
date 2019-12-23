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
        ListElementAction: () => import('~/core/components/List/ListElementAction'),
        ListElement: () => import('~/core/components/List/ListElement'),
        ListElementDescription: () => import('~/core/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/core/components/List/ListElementTitle'),
        ListElementHint: () => import('~/core/components/List/ListElementHint'),
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
