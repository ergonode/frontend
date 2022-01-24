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
                                :columns="localStatuses.length"
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
                                            :status="localStatuses[column - 1]"
                                            :has-right-border="column - 1 === columns"
                                            @swap="onSwapColumns" />
                                        <WorkflowDesignerGhostButton
                                            v-if="ghostIndex !== null && isAllowedToCreate"
                                            v-bind="{ ...ghostButtonBounds }"
                                            @click.native="setTransitionPointer" />
                                        <WorkflowDesignerLayoutElement
                                            v-for="(element, index) in layoutElements"
                                            :key="`${element.from}|${element.to}`"
                                            :index="index"
                                            :element="element"
                                            :columns="localStatuses"
                                            :layout-width="columns"
                                            @mouseenter.native="onRowMouseEnter(element.row)"
                                            @mouseleave.native="onRowMouseLeave">
                                            <template #content="{ elementWidth, isRevers }">
                                                <WorkflowDesignerLayoutPointer
                                                    v-if="element.from !== undefined
                                                        && !columnDraggedElement"
                                                    :ref="isRowEdited(element.row)
                                                        ? 'designerDraggablePointerEdited'
                                                        : null"
                                                    :is-edited="isRowEdited(element.row)"
                                                    :color="localStatuses[
                                                        isRevers ? element.to : element.from
                                                    ].color"
                                                    @click.native="
                                                        onRemoveStartPointer(element.row)
                                                    " />
                                                <WorkflowDesignerLayoutArrow
                                                    v-if="isLayoutArrow(element)
                                                        && !columnDraggedElement"
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
                                                    v-if="element.to !== undefined
                                                        && !columnDraggedElement"
                                                    :color="localStatuses[
                                                        isRevers ? element.from : element.to
                                                    ].color"
                                                    :style="{ gridColumn: elementWidth }" />
                                            </template>
                                        </WorkflowDesignerLayoutElement>
                                        <WorkflowDesignerVirtualOverlay
                                            v-if="columnDraggedElement && layoutElements.length"
                                            :scope="scope"
                                            :rows="layoutElements"
                                            :row-height="rowHeight"
                                            :columns="localStatuses"
                                            @swap="onSwapColumns">
                                            <template #appendRowBody="{ column }">
                                                <WorkflowDesignerLayoutPointer
                                                    :color="localStatuses[column].color" />
                                            </template>
                                        </WorkflowDesignerVirtualOverlay>
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
    swapItemPosition,
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
} from '@UI/models/designer/index';
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
import WorkflowDesignerVirtualOverlay
    from '@Workflow/components/Designers/VirtualOverlay/WorkflowDesignerVirtualOverlay';
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
        WorkflowDesignerVirtualOverlay,
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
            localStatuses: [],
        };
    },
    computed: {
        ...mapState('workflow', [
            'statuses',
            'transitions',
        ]),
        ...mapState('draggable', {
            columnGhostIndex: 'ghostIndex',
            columnDraggedElement: 'draggedElement',
        }),
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.create,
            ]);
        },
        isPlaceholderVisible() {
            return this.localStatuses.length < 2;
        },
        columnWidth() {
            return `minmax(${COLUMN_WIDTH}px, max-content)`;
        },
        rowHeight() {
            return ROW_HEIGHT;
        },
        lastItemRow() {
            const additionalRowsNumber = 1;
            const layoutElement = getMaxValueObject(this.layoutElements, 'row');

            if (!layoutElement) {
                return 0;
            }

            const {
                row,
            } = layoutElement;

            return (row + 1) + additionalRowsNumber;
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
        statuses: {
            immediate: true,
            handler() {
                this.localStatuses = [
                    ...this.statuses,
                ];
            },
        },
        layoutElements: {
            handler(elements) {
                this.excludeRows = getRows(elements);
            },
        },
        async $route(to, from) {
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
            'orderStatuses',
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
        async onSwapColumns({
            from,
            to,
        }) {
            this.localStatuses = swapItemPosition(
                this.localStatuses,
                from,
                to,
            );
            this.layoutElements = getMappedStatusPositions({
                layoutElements: this.layoutElements,
                statuses: this.localStatuses,
            });
            const statusIds = this.localStatuses.map(({
                id,
            }) => id);

            await this.orderStatuses({
                statusIds,
            });
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
            this.$cookies.set(
                WORKFLOW_DESIGNER_ROWS,
                getMappedRowPositions(this.layoutElements),
            );

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
                statuses: this.localStatuses,
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
                statuses: this.localStatuses,
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
                    columnsNumber: this.localStatuses.length,
                    obstacleColumns: getObstacleColumns({
                        from: column,
                        transitions: this.layoutElements,
                        columns: this.localStatuses.length,
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
                const from = this.localStatuses[tmpElement.from].id;
                const to = this.localStatuses[column].id;
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
        getWorkflowDesignerReference() {
            return this.$refs.designerDraggableLayer;
        },
    },
    provide() {
        return {
            getWorkflowDesignerReference: this.getWorkflowDesignerReference,
        };
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
