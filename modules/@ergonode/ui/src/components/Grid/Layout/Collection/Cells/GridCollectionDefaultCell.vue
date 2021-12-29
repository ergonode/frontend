/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <!-- TODO: Change relation to `multimedia` href.
             INFO: Secure relationship does not break the application.
        -->
        <slot name="image">
            <LazyImage
                v-if="data.image"
                class="grid-collection-default-cell__image"
                :href="`multimedia/${data.image}/download/default`"
                :value="data.image"
                :object-fit="objectFit" />
            <DefaultImage
                v-else
                class="grid-collection-default-cell__default-image" />
        </slot>
        <span
            class="grid-collection-default-cell__title"
            v-text="data.description"
            :title="data.description" />
        <GridCollectionCellActionsPanel>
            <template #prepend>
                <template v-if="isSelectColumn">
                    <div
                        class="grid-collection-default-cell__select"
                        @click.prevent="onSelect">
                        <CheckBox
                            v-if="multiselect"
                            :value="selected" />
                        <RadioButton
                            v-else
                            :value="selected" />
                    </div>
                </template>
            </template>
            <template #append>
                <Fab
                    v-if="data.actions.get"
                    class="grid-collection-default-cell__action"
                    :theme="secondaryTheme"
                    @click.native="onEdit">
                    <template #icon="{ color }">
                        <IconEdit
                            v-if="data.actions.edit"
                            :fill-color="color" />
                        <IconPreview
                            v-else
                            :fill-color="color" />
                    </template>
                </Fab>
                <Fab
                    v-if="data.actions.delete"
                    class="grid-collection-default-cell__action"
                    :theme="secondaryTheme"
                    @click.native="onDelete">
                    <template #icon="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </Fab>
            </template>
        </GridCollectionCellActionsPanel>
    </div>
</template>

<script>
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    THEME,
} from '@Core/defaults/theme';
import GridCollectionCellActionsPanel from '@UI/components/Grid/Layout/Collection/Cells/GridCollectionCellActionsPanel';
import RadioButton from '@UI/components/RadioButton/RadioButton';

export default {
    name: 'GridCollectionDefaultCell',
    components: {
        RadioButton,
        GridCollectionCellActionsPanel,
    },
    props: {
        /**
         * Component data used for filling cell
         */
        data: {
            type: Object,
            required: true,
        },
        /**
         * The drafts are unsaved changes, cached changed data at given time
         */
        drafts: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Determines image objectFit property
         */
        objectFit: {
            type: String,
            default: '',
        },
        /**
         * Determines if the component is multiple choice
         */
        multiselect: {
            type: Boolean,
            default: true,
        },
        /**
         * Determines if component is selected
         */
        selected: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if selecting row column is visible
         */
        isSelectColumn: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        classes() {
            return [
                'grid-collection-default-cell',
                {
                    'grid-collection-default-cell--selected': this.selected,
                },
            ];
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onSelect() {
            if (!this.disabled) {
                this.$emit('select', {
                    row: this.data.id,
                    selected: !this.selected,
                });
            }
        },
        onEdit() {
            if (this.data.actions.edit) {
                const args = this.data.actions.edit.href.split('/');

                this.$emit('row-action', {
                    key: 'edit',
                    value: args,
                });
            } else {
                const args = this.data.actions.get.href.split('/');

                this.$emit('row-action', {
                    key: 'preview',
                    value: args,
                });
            }
        },
        onDelete() {
            // TODO: Migrate it to Core and propagate action outside
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: 'Are you sure you want to remove this row?',
                applyTitle: 'YES, REMOVE',
                action: async () => {
                    try {
                        await this.$axios.$delete(this.data.actions.delete.href, {
                            baseURL: '',
                        });

                        this.$emit('row-action', {
                            key: 'delete',
                            value: this.data.id,
                        });
                    } catch (e) {
                        if (this.$axios.isCancel(e)) {
                            return;
                        }

                        this.$emit('error');
                    }
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-collection-default-cell {
        $cell: &;

        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        border: $BORDER_1_GREY;
        box-sizing: border-box;
        background-color: $WHITE;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

        &__title {
            width: 100%;
            height: 32px;
            padding: 8px;
            box-sizing: border-box;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        &__select {
            padding: 6px;
            cursor: pointer;
        }

        &__image {
            height: 0;
        }

        &__default-image, &__image {
            flex: 1 1 auto;
        }

        &__action {
            background-color: $WHITE;
            opacity: 0;
        }

        &__action, &__select {
            transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            will-change: opacity;
        }

        &:not(&--selected) {
            #{$cell}__select {
                opacity: 0;
            }
        }

        &:hover {
            border-color: transparent;
            box-shadow: $ELEVATOR_2_DP;

            #{$cell}__action, #{$cell}__select {
                opacity: 1;
            }
        }
    }
</style>
