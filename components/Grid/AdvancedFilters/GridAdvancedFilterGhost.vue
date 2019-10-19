/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['advanced-filters-ghost', {'advanced-filters-ghost--hovered': isMouseOverFilters}]"
        @drop="onDrop"
        @dragover="onDragOver">
        <div class="container">
            <IconAddFilter :fill-color="addIconFillColor" />
            <span class="advanced-filters-ghost__title">
                ADD FILTER
            </span>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
    white, graphite,
} from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'GridAdvancedFilterGhost',
    components: {
        IconAddFilter: () => import('~/components/Icon/Actions/IconAddFilter'),
    },
    props: {
        isMouseOverFilters: {
            type: Boolean,
            default: false,
        },
        namespace: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState('draggable', {
            ghostFilterIndex: (state) => state.ghostFilterIndex,
        }),
        ...mapState('list', {
            elements: (state) => state.elements,
        }),
        addIconFillColor() {
            return this.isMouseOverFilters ? white : graphite;
        },
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElement',
        ]),
        async onDrop(event) {
            this.$emit('mouseOverFilters', false);

            const data = event.dataTransfer.getData('text/plain');

            try {
                const parsedFilter = JSON.parse(data);

                this.$store.dispatch(`${this.namespace}/setAdvancedFilterAtIndex`, {
                    index: this.ghostFilterIndex,
                    filter: parsedFilter,
                });
            } catch (e) {
                const [value, languageCode] = data.split(':');

                await this.getAttributeByCode(languageCode, value);
            }
        },
        onDragOver(event) {
            if (!this.isMouseOverFilters) this.$emit('mouseOverFilters', true);

            event.preventDefault();
        },
        getAttributeByCode(languageCode, value) {
            const attributeId = `${value}:${languageCode}`;
            const index = this.ghostFilterIndex;
            const params = {
                limit: 999999,
                offset: 0,
                columns: attributeId,
            };
            return this.$axios.$get(`${languageCode}/products`, { params }).then(({ columns }) => {
                const [attribute] = columns;
                const columnIndex = this.$store.state[this.namespace].columns
                    .findIndex((column) => column.id === attributeId);

                this.$store.dispatch(`${this.namespace}/insertAdvancedFilterAtIndex`, {
                    index,
                    filter: attribute,
                });
                this.setDisabledElement({
                    languageCode, elementId: attribute.element_id, disabled: columnIndex !== -1,
                });
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .advanced-filters-ghost {
        $filter: &;

        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        padding: 0 12px;
        background-color: $lightGrey;
        box-shadow:
            inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
            inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
            inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);

        &__title {
            @include setFont(bold, small, regular, $darkGraphite);

            margin-left: 8px;
        }

        &--hovered {
            background-color: $primary;

            #{$filter}__title {
                color: $white;
            }
        }
    }

    .container {
        display: flex;
        align-items: center;
    }
</style>
