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
                    :style="gridStyles"
                    :columns="columnsNumber"
                    :rows="maxRows" />
                <TemplateGridDraggableLayer
                    :style="gridStyles"
                    :rows-number="maxRows"
                    :columns-number="columnsNumber"
                    :layout-elements="layoutElements"
                    @addListElementToLayout="updateLayoutElement" />
            </TemplateGridDesigner>
        </div>
        <Footer :buttons="buttons" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'TemplateGrid',
    components: {
        TemplateGridPresentationLayer: () => import('~/components/TemplateGrid/TemplateDesigner/TemplateGridPresentationLayer'),
        TemplateGridDesigner: () => import('~/components/TemplateGrid/TemplateDesigner/TemplateGridDesigner'),
        TemplateGridDraggableLayer: () => import('~/components/TemplateGrid/TemplateDesigner/TemplateGridDraggableLayer'),
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
            layoutElements: state => state.layoutElements,
            titleValidationError: state => state.titleValidationError,
            title: state => state.title,
        }),
        ...mapState('draggable', {
            draggedElement: state => state.draggedElement,
        }),
        vmTitle: {
            get() {
                return this.title;
            },
            set(value) {
                this.setTemplateDesignerTitle({ title: value });
            },
        },
        errorMessages() {
            return this.titleValidationError ? [this.titleValidationError] : null;
        },
        gridStyles() {
            return {
                gridTemplateColumns: `repeat(${this.columnsNumber}, 1fr)`,
                gridAutoRows: '62px',
            };
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'setTemplateDesignerTitle',
            'addListElementToLayout',
            'updateLayoutElementPosition',
        ]),
        onRowsCountChange({ value }) {
            this.maxRows = value;
        },
        updateLayoutElement(position) {
            if (typeof this.draggedElement === 'object') {
                const { row, column } = position;
                const layoutElement = { ...this.draggedElement, row, column };

                this.updateLayoutElementPosition(layoutElement);
            } else {
                this.addListElementToLayout(position);
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
</style>
