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
                <span
                    class="group__title font--semi-bold-m-2"
                    v-text="title" />
                <span
                    class="group__subtitle font--semi-bold-s-1"
                    v-text="subtitle" />
            </ListElementDescription>
            <ListElementAction>
                <IconArrowSingle :state="iconState" />
            </ListElementAction>
        </ListElement>
        <div v-if="isExpanded">
            <slot name="item" />
        </div>
    </div>
</template>

<script>
import { Arrow } from '~/model/icons/Arrow';

export default {
    name: 'ListGroupElement',
    components: {
        ListElementAction: () => import('~/components/List/ListElementAction'),
        ListElement: () => import('~/components/List/ListElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
        IconArrowSingle: () => import('~/components/Icon/Arrows/IconArrowSingle'),
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
        isExpanded: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        iconState() {
            return this.isExpanded
                ? Arrow.UP
                : Arrow.DOWN;
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

<style lang="scss" scoped>
    .group {
        &__title {
            color: $GRAPHITE_DARK;
        }

        &__subtitle {
            color: $GRAPHITE;
        }

        &__title, &__subtitle {
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
</style>
