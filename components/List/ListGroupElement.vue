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
                    class="group__title"
                    v-text="group.label" />
                <span
                    class="group__subtitle"
                    v-text="`${group.elementsCount} Attributes`" />
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
        group: {
            type: Object,
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
            @include setFont(medium, regular, semiRegular, $darkGraphite);
        }

        &__subtitle {
            @include setFont(semiBold, tiny, regular, $graphite);
        }

        &__title, &__subtitle {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
</style>
