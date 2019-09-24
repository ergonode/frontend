/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="template-designer">
        <div class="horizontal-wrapper">
            <VerticalTabBar :items="verticalTabs" />
            <TemplateGridDesigner @rowsCount="onRowsCountChange">
                <TemplateGridDraggableLayer
                    :style="gridStyles"
                    :rows-number="maxLayoutRow"
                    :columns-number="columnsNumber"
                    :layout-elements="layoutElements"
                    @addListElementToLayout="updateLayoutElement"
                    @editSectionTitle="onEditSectionTitle"
                    @resizingElMaxRow="onResizingElMaxRow" />
                <ModalSectionTitleTemplate
                    :value="isSectionAdded"
                    :section-position="sectionPosition"
                    :section-title="sectionTitle"
                    :section-index="sectionIndex"
                    @input="onCloseSectionModal" />
            </TemplateGridDesigner>
        </div>
        <Footer :buttons="buttons" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getObjectWithMaxValueInArrayByObjectKey } from '~/model/arrayWrapper';

export default {
    name: 'TemplateGrid',
    components: {
        TemplateGridDesigner: () => import('~/components/TemplateGrid/TemplateDesigner/TemplateGridDesigner'),
        TemplateGridDraggableLayer: () => import('~/components/TemplateGrid/TemplateDesigner/TemplateGridDraggableLayer'),
        VerticalTabBar: () => import('~/components/Tab/VerticalTabBar'),
        Footer: () => import('~/components/ReusableFooter/Footer'),
        ModalSectionTitleTemplate: () => import('~/components/Modals/ModalSectionTitleTemplate'),
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isSectionAdded: false,
            sectionPosition: null,
            sectionIndex: null,
            sectionTitle: '',
            columnsNumber: 4,
            maxRow: 0,
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
                    disabled: !this.$hasAccess('TEMPLATE_DESIGNER_UPDATE'),
                },
            ],
            verticalTabs: [
                {
                    title: 'Attributes',
                    component: () => import('~/components/Card/AttributesListTab'),
                    props: {
                        isSelectLanguage: false,
                        disabled: !this.$hasAccess('TEMPLATE_DESIGNER_UPDATE'),
                    },
                    iconPath: 'Menu/IconAttributes',
                    active: true,
                },
                {
                    title: 'Widgets',
                    component: () => import('~/components/Card/Tabs/WidgetsListTab'),
                    iconPath: 'Widgets/IconWidget',
                    active: false,
                },
            ],
        };
    },
    computed: {
        ...mapState('templateDesigner', {
            templateGroups: state => state.templateGroups,
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
                this.setTemplateDesignerTitle(value);
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
        maxLayoutRow() {
            const layoutElement = getObjectWithMaxValueInArrayByObjectKey(this.layoutElements, 'row');

            if (layoutElement) {
                const { row, height } = layoutElement;

                return Math.max(this.maxRow, row + height);
            }

            return this.maxRow;
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'setTemplateDesignerTitle',
            'addListElementToLayout',
            'updateLayoutElementPosition',
        ]),
        onResizingElMaxRow(row) {
            if (row > this.maxRow) {
                this.maxRow = row;
            }
        },
        onRowsCountChange({ value }) {
            this.maxRow = value;
        },
        updateLayoutElement(position) {
            if (typeof this.draggedElement === 'object') {
                const { row, column } = position;
                const index = this.layoutElements.findIndex(el => el.id === this.draggedElement.id);

                this.updateLayoutElementPosition({ index, row, column });
            } else if (this.draggedElement === 'SECTION') {
                this.sectionPosition = position;
                this.isSectionAdded = true;
            } else {
                this.addListElementToLayout(position);
            }
        },
        onEditSectionTitle(index) {
            const { [index]: layoutElement } = this.layoutElements;
            this.sectionTitle = layoutElement.label;
            this.sectionIndex = index;
            this.isSectionAdded = true;
        },
        onCloseSectionModal() {
            this.sectionPosition = null;
            this.isSectionAdded = false;
            this.sectionTitle = '';
            this.sectionIndex = null;
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
            display: grid;
            grid-template-columns: max-content auto;
            flex: 1;
            grid-column-gap: 24px;
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
