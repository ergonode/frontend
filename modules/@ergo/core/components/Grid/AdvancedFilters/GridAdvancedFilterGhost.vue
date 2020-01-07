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
            <span class="advanced-filters-ghost__title font--bold-12-16">
                ADD FILTER
            </span>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
    WHITE, GRAPHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import { insertCookieAtIndex } from '@Core/models/cookies';
import { ADV_FILTERS_IDS } from '@Core/defaults/grid/cookies';

export default {
    name: 'GridAdvancedFilterGhost',
    components: {
        IconAddFilter: () => import('@Core/components/Icons/Actions/IconAddFilter'),
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
        addIconFillColor() {
            return this.isMouseOverFilters ? WHITE : GRAPHITE;
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

                try {
                    insertCookieAtIndex({
                        cookies: this.$cookies,
                        cookieName: ADV_FILTERS_IDS,
                        index,
                        data: attribute.id,
                    });
                } catch {
                    this.$cookies.set(ADV_FILTERS_IDS, attribute.id);
                }
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
        background-color: $GREY_LIGHT;
        box-shadow: $ELEVATOR_HOLE;

        &__title {
            margin-left: 8px;
            color: $GRAPHITE_DARK;
        }

        &--hovered {
            background-color: $GREEN;

            #{$filter}__title {
                color: $WHITE;
            }
        }
    }

    .container {
        display: flex;
        align-items: center;
    }
</style>
