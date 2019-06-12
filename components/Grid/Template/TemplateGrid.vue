/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="template-designer">
        <div class="horizontal-wrapper">
            <VerticalTabBar :items="verticalTabs" />
            <TemplateGridDesigner @rowsCount="onRowsCountChange">
                <TemplateGridPresentationLayer
                    :grid-styles="gridStyles"
                    :columns="columnsNumber"
                    :rows="maxRows"
                    :is-header="false" />
                <div
                    :style="gridStyles"
                    class="draggable-grid">
                    <template v-for="item in draggableGridAreaLenght">
                        <TemplateGridGhostItem
                            :key="item"
                            :position="{ row: Math.ceil(item / columnsNumber), column: item % columnsNumber }"
                            @drop="onDrop" />
                    </template>
                    <div
                        v-for="item in insertedItems"
                        :key="item"
                        :style="{ gridRow: item.row, gridColumn: item.column }"
                        class="inserted" />
                </div>
            </TemplateGridDesigner>
        </div>
        <Footer :buttons="buttons" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TemplateGridItem from './TemplateGridItem';
import TemplateGridSection from './TemplateGridSection';
import AttributeElement from '~/components/Template/AttributeElement';

export default {
    name: 'TemplateGrid',
    components: {
        TemplateGridPresentationLayer: () => import('~/components/TemplateGrid/TemplateGridPresentationLayer'),
        TemplateGridGhostItem: () => import('~/components/TemplateGrid/TemplateDesigner/TemplateGridGhostItem'),
        TemplateGridDesigner: () => import('~/components/TemplateGrid/TemplateDesigner/TemplateGridDesigner'),
        VerticalTabBar: () => import('~/components/Tab/VerticalTabBar'),
        Footer: () => import('~/components/ReusableFooter/Footer'),
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            columnsNumber: 4,
            maxRows: 0,
            insertedItems: [],
            buttons: [
                // TODO: Uncomment when we will have this feature
                // {
                //     title: 'PREVIEW',
                //     color: 'transparent',
                //     action: vm.onPreview,
                //     theme: 'dark',
                // },
                {
                    title: 'SAVE TEMPLATE',
                    action: this.updateButton.action,
                },
            ],
            verticalTabs: [
                {
                    title: 'Filters & Columns',
                    component: () => import('~/components/Card/AttributesListTab'),
                    icon: 'sprite-sidebar sidebar-filter',
                    active: true,
                },
            ],
        };
    },
    computed: {
        ...mapState('templateDesigner', {
            templateGroups: state => state.templateGroups,
            layout: state => state.templateLayout,
            titleValidationError: state => state.titleValidationError,
            title: state => state.title,
        }),
        vmTitle: {
            get() {
                return this.title;
            },
            set(value) {
                this.setTemplateDesignerTitle({ title: value });
            },
        },
        draggableGridAreaLenght() {
            return this.maxRows * this.columnsNumber;
        },
        errorMessages() {
            return this.titleValidationError ? [this.titleValidationError] : null;
        },
        gridStyles() {
            return {
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridAutoRows: '50px',
            };
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'setTemplateDesignerTitle',
        ]),
        onDrop(position) {
            this.insertedItems.push({ ...position });
        },
        onRowsCountChange({ key, value }) {
            this.maxRows = value;
        },
        getComponentViaName(name) {
            switch (name) {
            case 'TemplateGridItem':
                return TemplateGridItem;
            case 'TemplateGridSection':
                return TemplateGridSection;
            case 'AttributeElement':
                return AttributeElement;
            default:
                return null;
            }
        },
        onPreview() {

        },
    },
};
</script>

<style lang="scss" scoped>
    .template-designer {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        flex-grow: 1;

        .horizontal-wrapper {
            display: flex;
            flex: 1;
            margin: 24px 24px 0;

            .grid-wrapper {
                position: relative;
                display: flex;
                flex: 1;
                flex-direction: column;
                width: 0;
                margin: 12px;
                overflow: auto;
            }
        }

        &__grid {
            position: relative;
            display: grid;
            height: 0;
            padding: 0 21px;
            grid-gap: 10px 21px;
            grid-template-columns: repeat(4, minmax(240px, auto));
        }
    }

    .draggable-grid {
        z-index: 3;
        display: grid;
        height: 0;
        flex-grow: 1;

        .inserted {
            background-color: #4c9aff;
        }
    }

</style>
