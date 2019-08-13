/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="gridWrapperClasses">
        <Grid
            :store-namespace="storeNamespace"
            :action-paths="actionPaths"
            :rows-height="rowsHeight"
            :filterable="filterable">
            <template v-slot:cell="{column, columnIndex}">
                <slot
                    name="cell"
                    :column="column"
                    :column-index="columnIndex" />
            </template>
        </Grid>
        <GridPlaceholder v-if="isPlaceholder" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'GridWrapper',
    components: {
        Grid: () => import('~/components/Grid/Grid'),
        GridPlaceholder: () => import('~/components/Grid/GridPlaceholder'),
    },
    props: {
        storeNamespace: {
            type: String,
            required: true,
        },
        rowsHeight: {
            type: Number,
            required: true,
        },
        actionPaths: {
            type: Object,
            required: true,
        },
        filterable: {
            type: Boolean,
            default: true,
        },
    },
    destroyed() {
        this.removeValidationErrors();
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            isColumnDragging: state => state.isColumnDragging,
        }),
        gridState() {
            return this.$store.state[this.storeNamespace];
        },
        gridWrapperClasses() {
            return [
                'grid-wrapper',
                {
                    'grid-wrapper--element-dragged': this.isListElementDragging,
                    'grid-wrapper--column-dragged': this.isColumnDragging,
                },
            ];
        },
        isPlaceholder() {
            return !this.gridState.rowIds.length;
        },
    },
    methods: {
        ...mapActions('validations', [
            'removeValidationErrors',
        ]),
    },
};
</script>


<style lang="scss" scoped>
    .grid-wrapper {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        justify-content: space-between;
        height: 0;
        padding: 12px 12px 0;

        &--element-dragged {
            z-index: 11;
            background-color: $lightGrey;
            box-shadow:
                inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
                inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }

        &--column-dragged {
            z-index: 16;
        }
    }
</style>
