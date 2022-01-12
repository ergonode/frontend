/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="workflow-designer"
        @click="onClickOutside">
        <Preloader v-if="isFetchingData" />
        <VerticalFixedScroll v-else>
            <div class="workflow-designer__container">
                <HorizontalFixedScroll>
                    <div class="workflow-designer__container">
                        <div class="workflow-designer__space-container">
                            <div class="workflow-designer__extender" />
                            <WorkflowDesignerDefaultStatusPlaceholder v-if="isPlaceholderVisible" />
                            <Designer
                                data-cy="workflow-designer"
                                :columns="statuses.length"
                                :column-width="columnWidth"
                                :row-height="rowHeight"
                                :last-item-row="lastItemRow">
                                <template
                                    #backgroundBody="{
                                        rows,
                                        columns,
                                        layerStyle,
                                    }">
                                    <DesignerBackgroundLayer
                                        :style="layerStyles({ layerStyle })"
                                        :columns="columns"
                                        :rows="rows">
                                        <div
                                            v-for="column in columns"
                                            :key="column" />
                                        <template #item="{ row, column }">
                                            <WorkflowDesignerBackgroundItem
                                                :key="`${column} | ${row}`"
                                                :column="column"
                                                :row="row"
                                                :valid-columns="validColumns"
                                                :edited-row="editedRow"
                                                :exclude-rows="excludeRows"
                                                :has-right-border="column + 1 === columns" />
                                        </template>
                                    </DesignerBackgroundLayer>
                                </template>
                                <template #appendBody="{ columns, layerStyle }">
                                    <DesignerDraggableLayer
                                        ref="designerDraggableLayer"
                                        @mousemove.native="onMouseMove"
                                        @mouseleave.native="onMouseLeave"
                                        :style="layerStyles({ layerStyle })">
                                        <WorkflowDesignerHeaderLayerCell
                                            v-for="column in columns"
                                            :key="column"
                                            :index="column - 1"
                                            :scope="scope"
                                            :status="statuses[column - 1]"
                                            :has-right-border="column === columns" />
                                        <WorkflowDesignerGhostButton
                                            v-if="ghostIndex !== null && isAllowedToCreate"
                                            v-bind="{ ...ghostButtonBounds }"
                                            @click.native="setTransitionPointer" />
                                        <WorkflowDesignerLayoutElement
                                            v-for="(element, index) in layoutElements"
                                            :key="`${element.id}`"
                                            :index="index"
                                            :element="element"
                                            :layout-width="columns"
                                            @mouseenter.native="onRowMouseEnter(element.row)"
                                            @mouseleave.native="onRowMouseLeave">
                                            <template #content="{ elementWidth, isRevers }">
                                                <WorkflowDesignerLayoutPointer
                                                    v-if="element.from !== undefined"
                                                    :ref="isRowEdited(element.row)
                                                        ? 'designerDraggablePointerEdited'
                                                        : null"
                                                    :is-edited="isRowEdited(element.row)"
                                                    :color="statuses[
                                                        isRevers ? element.to : element.from
                                                    ].color"
                                                    @click.native="
                                                        onRemoveStartPointer(element.row)
                                                    " />
                                                <WorkflowDesignerLayoutArrow
                                                    v-if="isLayoutArrow(element) && !draggedElement"
                                                    :is-edited="isRowEdited(element.row)"
                                                    :is-revers="
                                                        isLayoutArrowRevers({
                                                            row: element.row,
                                                            isRevers,
                                                        })"
                                                    :element-width="elementWidth"
                                                    :mouse-x-position="mouseXPosition">
                                                    <template #arrowActions>
                                                        <WorkflowDesignerLayoutArrowActions
                                                            :element-id="element.id"
                                                            :is-hovered="
                                                                element.row === rowHovered
                                                            "
                                                            :is-saved="transitions[index].isSaved"
                                                            @remove-transition="onRemoveTransition"
                                                            @submit-transition="onSubmitTransition"
                                                        />
                                                    </template>
                                                </WorkflowDesignerLayoutArrow>
                                                <WorkflowDesignerLayoutPointer
                                                    v-if="element.to !== undefined"
                                                    :color="statuses[
                                                        isRevers ? element.from : element.to
                                                    ].color"
                                                    :style="{ gridColumn: elementWidth }" />
                                            </template>
                                        </WorkflowDesignerLayoutElement>
                                    </DesignerDraggableLayer>
                                </template>
                            </Designer>
                            <WorkflowDesignerIllustrationPlaceholder v-if="isPlaceholderVisible" />
                            <div class="workflow-designer__extender" />
                        </div>
                    </div>
                </HorizontalFixedScroll>
            </div>
        </VerticalFixedScroll>
    </div>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import updateButtonFeedbackMixin from '@Core/mixins/feedback/updateButtonFeedbackMixin';
import {
    getMaxValueObject,
    removeValueAtIndex,
} from '@Core/models/arrayWrapper';
import {
    hasAnyChange,
} from '@Core/models/mappers/feedbackMapper';
import {
    isEmpty,
} from '@Core/models/objectWrapper';
import Designer from '@UI/components/Designer/Designer';
import DesignerBackgroundLayer from '@UI/components/Designer/DesignerBackgroundLayer';
import DesignerDraggableLayer from '@UI/components/Designer/DesignerDraggableLayer';
import HorizontalFixedScroll from '@UI/components/Layout/Scroll/HorizontalFixedScroll';
import VerticalFixedScroll from '@UI/components/Layout/Scroll/VerticalFixedScroll';
import {
    getBackgroundItem,
} from '@UI/models/designer/intex';
import {
    getFixedMousePosition,
    isMouseOutsideElement,
} from '@UI/models/mouse';
import WorkflowDesignerLayoutArrow
    from '@Workflow/components/Designers/LayoutElements/WorkflowDesignerLayoutArrow';
import WorkflowDesignerLayoutArrowActions
    from '@Workflow/components/Designers/LayoutElements/WorkflowDesignerLayoutArrowActions';
import WorkflowDesignerLayoutElement
    from '@Workflow/components/Designers/LayoutElements/WorkflowDesignerLayoutElement';
import WorkflowDesignerLayoutPointer
    from '@Workflow/components/Designers/LayoutElements/WorkflowDesignerLayoutPointer';
import WorkflowDesignerBackgroundItem
    from '@Workflow/components/Designers/WorkflowDesignerBackgroundItem';
import WorkflowDesignerDefaultStatusPlaceholder
    from '@Workflow/components/Designers/WorkflowDesignerDefaultStatusPlaceholder';
import WorkflowDesignerGhostButton
    from '@Workflow/components/Designers/WorkflowDesignerGhostButton';
import WorkflowDesignerHeaderLayerCell
    from '@Workflow/components/Designers/WorkflowDesignerHeaderLayerCell';
import WorkflowDesignerIllustrationPlaceholder
    from '@Workflow/components/Designers/WorkflowDesignerIllustrationPlaceholder';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    ROUTE_NAME,
} from '@Workflow/config/routes';
import {
    WORKFLOW_STATUS_CREATED_EVENT_NAME,
} from '@Workflow/defaults';
import {
    WORKFLOW_DESIGNER_ROWS,
} from '@Workflow/defaults/cookies';
import {
    COLUMN_WIDTH,
    EDITED_ROW_ID,
    HEADER_HEIGHT,
    LAYOUT_POINTER_WIDTH,
    ROW_HEIGHT,
} from '@Workflow/defaults/designer';
import {
    getFromAndToTransition,
    getMappedLayoutElements,
    getMappedRowPositions,
    getMappedStatusPositions,
    getObstacleColumns,
    getRows,
    getValidColumnsToAddTransition,
} from '@Workflow/models/workflowDesigner';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'WorkflowDesigner',
    components: {
        WorkflowDesignerLayoutPointer,
        WorkflowDesignerLayoutArrowActions,
        WorkflowDesignerLayoutArrow,
        WorkflowDesignerGhostButton,
        WorkflowDesignerLayoutElement,
        WorkflowDesignerBackgroundItem,
        WorkflowDesignerDefaultStatusPlaceholder,
        WorkflowDesignerIllustrationPlaceholder,
        DesignerBackgroundLayer,
        WorkflowDesignerHeaderLayerCell,
        Designer,
        DesignerDraggableLayer,
        VerticalFixedScroll,
        HorizontalFixedScroll,
    },
    mixins: [
        updateButtonFeedbackMixin,
    ],
    props: {
        scope: {
            type: String,
            default: '',
        },
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    async fetch() {
        this.getWorkflow({
            workflowId: this.$route.params.workflowId,
            onSuccess: this.onFetchDataSuccess,
            onError: this.onFetchDataError,
        });
    },
    data() {
        return {
            isFetchingData: true,
            rowHovered: null,
            ghostIndex: null,
            editedRow: -1,
            mouseXPosition: 0,
            excludeRows: [],
            layoutElements: [],
            validColumns: [],
        };
    },
    computed: {
        ...mapState('workflow', [
            'statuses',
            'transitions',
        ]),
        ...mapState('draggable', [
            'draggedElement',
        ]),
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.create,
            ]);
        },
        isPlaceholderVisible() {
            return this.statuses.length < 2;
        },
        columnWidth() {
            return `minmax(${COLUMN_WIDTH}px, max-content)`;
        },
        rowHeight() {
            return ROW_HEIGHT;
        },
        lastItemRow() {
            const layoutElement = getMaxValueObject(this.layoutElements, 'row');

            if (!layoutElement) {
                return 0;
            }

            const {
                row,
            } = layoutElement;

            return row + 1;
        },
        ghostButtonBounds() {
            const {
                row,
                column,
            } = this.ghostIndex;
            const headerRow = 1;

            return {
                row: row + headerRow,
                column,
                rowHeight: this.rowHeight,
            };
        },
    },
    watch: {
        layoutElements: {
            handler(elements) {
                this.excludeRows = getRows(elements);
            },
        },
        async $route(from, to) {
            if (from.name !== to.name) {
                await this.onWorkflowStatusCreated();
            }
        },
    },
    mounted() {
        document.documentElement.addEventListener(
            WORKFLOW_STATUS_CREATED_EVENT_NAME,
            this.onWorkflowStatusCreated,
        );
        document.documentElement.addEventListener(
            'keydown',
            this.onKeyDown,
            true,
        );
    },
    beforeDestroy() {
        document.documentElement.removeEventListener(
            WORKFLOW_STATUS_CREATED_EVENT_NAME,
            this.onWorkflowStatusCreated,
        );
        document.documentElement.removeEventListener(
            'keydown',
            this.onKeyDown,
            true,
        );
    },
    methods: {
        ...mapActions('workflow', [
            'getWorkflow',
            'getStatuses',
            'getWorkflowById',
            'updateWorkflow',
            '__setState',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        isOutOfBounds(event) {
            const {
                xPos,
                yPos,
            } = getFixedMousePosition(event);

            return this.$refs.designerDraggableLayer
                ? isMouseOutsideElement(this.$refs.designerDraggableLayer.$el, xPos, yPos)
                : null;
        },
        isRowEdited(row) {
            return row === this.editedRow;
        },
        isLayoutArrow({
            row, from,
        }) {
            if (this.isRowEdited(row)) {
                const borderWidth = 2;
                const halfPointerWidth = LAYOUT_POINTER_WIDTH / 2;

                return Math.abs(this.mouseXPosition) > halfPointerWidth + borderWidth;
            }

            return from !== undefined;
        },
        isLayoutArrowRevers({
            row, isRevers,
        }) {
            if (this.isRowEdited(row)) {
                return !(this.mouseXPosition > 0);
            }

            return isRevers;
        },
        getRowIndex(id) {
            return this.layoutElements.findIndex(
                element => element.id === id,
            );
        },
        onRemoveTransition(id) {
            const [
                from,
                to,
            ] = getFromAndToTransition(id);
            this.layoutElements = removeValueAtIndex(
                this.layoutElements,
                this.getRowIndex(id),
            );

            this.__setState({
                key: 'transitions',
                value: this.transitions.filter(
                    transition => !(transition.from === from
                        && transition.to === to),
                ),
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'workflowDesigner',
                value: true,
            });
        },
        onSubmitTransition(id) {
            if (hasAnyChange({
                changeValues: {
                    [this.scope]: this.changeValues,
                },
                errors: this.errors,
            })) {
                this.$confirm({
                    type: MODAL_TYPE.POSITIVE,
                    title: this.$t('@Workflow.workflow.components.WorkflowDesigner.confirmTitle'),
                    subtitle: this.$t('@Workflow.workflow.components.WorkflowDesigner.confirmSubtitle'),
                    applyTitle: this.$t('@Workflow.workflow.components.WorkflowDesigner.applyTitle'),
                    cancelTitle: this.$t('@Workflow.workflow.components.WorkflowDesigner.cancelTitle'),
                    action: async () => {
                        await this.updateWorkflow({
                            scope: this.scope,
                            workflowId: this.$route.params.workflowId,
                            onSuccess: () => {
                                this.onUpdateSuccess(id);
                            },
                            onError: this.onUpdateError,
                        });

                        this.removeScopeErrors(this.scope);
                    },
                });
            } else {
                this.onTransitionRedirect(id);
            }
        },
        onTransitionRedirect(id) {
            this.$router.push({
                name: ROUTE_NAME.WORKFLOW_TRANSITION_EDIT_GENERAL,
                params: {
                    workflowId: this.$route.params.workflowId,
                    id,
                },
            });
        },
        onRemoveStartPointer(row) {
            if (this.isRowEdited(row)) {
                this.editedRow = -1;
                this.validColumns = [];
                this.mouseXPosition = 0;
                this.layoutElements = removeValueAtIndex(
                    this.layoutElements,
                    this.getRowIndex(EDITED_ROW_ID),
                );
            }
        },
        onUpdateSuccess(id) {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Workflow.workflow.components.WorkflowDesigner.updateSuccessMessage'),
            });

            this.markChangeValuesAsSaved(this.scope);
            this.onTransitionRedirect(id);
        },
        onUpdateError(errors) {
            this.onError(errors);
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Workflow.workflow.components.WorkflowDesigner.updateErrorMessage'),
            });
        },
        async onWorkflowStatusCreated() {
            this.isFetchingData = true;

            await this.getWorkflowById({
                workflowId: this.$route.params.workflowId,
                onError: this.onFetchDataError,
            });
            await this.getStatuses({
                onSuccess: this.onFetchStatusSuccess,
                onError: this.onFetchDataError,
            });
        },
        onFetchStatusSuccess() {
            this.layoutElements = getMappedStatusPositions({
                layoutElements: this.layoutElements,
                statuses: this.statuses,
            });

            this.isFetchingData = false;
        },
        onFetchDataSuccess() {
            const rowsPositions = this.$cookies.get(WORKFLOW_DESIGNER_ROWS)
                && !isEmpty(this.$cookies.get(WORKFLOW_DESIGNER_ROWS))
                ? this.$cookies.get(WORKFLOW_DESIGNER_ROWS)
                : null;

            this.layoutElements = getMappedLayoutElements({
                transitions: this.transitions,
                statuses: this.statuses,
                rowsPositions,
            });

            this.isFetchingData = false;
        },
        onFetchDataError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Workflow.workflow.components.WorkflowDesigner.errorMessage'),
            });

            this.isFetchingData = false;
        },
        layerStyles({
            layerStyle,
        }) {
            return {
                ...layerStyle,
                gridTemplateRows: `${HEADER_HEIGHT}px ${layerStyle.gridTemplateRows}`,
            };
        },
        setTransitionPointer() {
            const {
                row,
                column,
            } = this.ghostIndex;

            if (this.editedRow === -1) {
                this.validColumns = getValidColumnsToAddTransition({
                    columnsNumber: this.statuses.length,
                    obstacleColumns: getObstacleColumns({
                        from: column,
                        transitions: this.layoutElements,
                        columns: this.statuses.length,
                    }),
                });

                if (this.validColumns.length) {
                    this.editedRow = row;
                    this.layoutElements.push({
                        id: EDITED_ROW_ID,
                        from: column,
                        row,
                    });
                } else {
                    this.$addAlert({
                        type: ALERT_TYPE.WARNING,
                        message: this.$t('@Workflow.workflow.components.WorkflowDesigner.warningMessage'),
                    });
                }
            } else {
                const editedIndex = this.getRowIndex(EDITED_ROW_ID);
                const tmpElement = this.layoutElements[editedIndex];
                const [
                    prevFrom,
                    prevTo,
                ] = getFromAndToTransition(tmpElement.id);
                const from = this.statuses[tmpElement.from].id;
                const to = this.statuses[column].id;
                const transitionId = `${from}--${to}`;

                this.editedRow = -1;
                this.validColumns = [];
                this.mouseXPosition = 0;
                this.layoutElements[editedIndex] = {
                    id: transitionId,
                    from: tmpElement.from,
                    to: column,
                    row,
                };

                const transitionIndex = this.transitions.findIndex(
                    transition => transition.from === prevFrom
                        && transition.to === prevTo,
                );
                if (transitionIndex === -1) {
                    this.__setState({
                        key: 'transitions',
                        value: [
                            ...this.transitions,
                            {
                                from,
                                to,
                                roles: [],
                                isSaved: false,
                            },
                        ],
                    });
                } else {
                    const transitions = [
                        ...this.transitions,
                    ];

                    transitions[transitionIndex].from = from;
                    transitions[transitionIndex].to = to;

                    this.__setState({
                        key: 'transitions',
                        value: transitions,
                    });
                }

                this.onScopeValueChange({
                    scope: this.scope,
                    fieldKey: 'workflowDesigner',
                    value: true,
                });
                this.$cookies.set(
                    WORKFLOW_DESIGNER_ROWS,
                    getMappedRowPositions(this.layoutElements),
                );
            }

            this.ghostIndex = null;
        },
        setGhostStartPointer(event) {
            const backgroundItem = getBackgroundItem({
                pageX: event.pageX,
                pageY: event.pageY,
                itemClass: 'workflow-designer-background-item--start-position',
            });

            if (backgroundItem) {
                const {
                    row,
                    column,
                } = backgroundItem;

                this.ghostIndex = {
                    row,
                    column,
                };
            } else {
                this.ghostIndex = null;
            }
        },
        setGhostEndPointer(event) {
            const backgroundItem = getBackgroundItem({
                pageX: event.pageX,
                pageY: event.pageY,
                itemClass: 'workflow-designer-background-item',
            });

            if (backgroundItem) {
                const {
                    column,
                } = backgroundItem;
                const [
                    editedPointer,
                ] = this.$refs.designerDraggablePointerEdited;
                const {
                    x: pointerX,
                    width: pointerWidth,
                } = editedPointer.$el.getBoundingClientRect();

                this.mouseXPosition = ((pointerX + (pointerWidth / 2)) - event.pageX) * -1;

                if (this.validColumns.includes(column)) {
                    this.ghostIndex = {
                        row: this.editedRow,
                        column,
                    };
                }
            }
        },
        onMouseMove(event) {
            event.preventDefault();

            if (this.editedRow !== -1) {
                this.setGhostEndPointer(event);
            } else {
                this.setGhostStartPointer(event);
            }
        },
        onMouseLeave(event) {
            if (this.isOutOfBounds(event) && this.ghostIndex !== null) {
                this.ghostIndex = null;
            }
        },
        onClickOutside(event) {
            if (this.isOutOfBounds(event) && this.editedRow !== -1) {
                this.ghostIndex = null;
                this.editedRow = -1;
                this.validColumns = [];
                this.mouseXPosition = 0;
                this.layoutElements = removeValueAtIndex(
                    this.layoutElements,
                    this.getRowIndex(EDITED_ROW_ID),
                );
            }
        },
        onRowMouseEnter(row) {
            this.rowHovered = row;
        },
        onRowMouseLeave() {
            this.rowHovered = null;
        },
        onKeyDown({
            keyCode,
        }) {
            if (this.editedRow !== -1) {
                switch (keyCode) {
                case 27: // esc key
                    this.onRemoveStartPointer(this.editedRow);
                    break;
                default: break;
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .workflow-designer {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;

        &__container {
            display: flex;
            height: 100%;
        }

        &__space-container {
            display: flex;
            flex: 1;
            padding: 24px;
        }

        &__extender {
            flex: 1 1 100%;
        }
    }
</style>
