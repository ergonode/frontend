/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="workflow-designer">
        <Preloader v-if="isFetchingData" />
        <VerticalFixedScroll v-else>
            <div class="workflow-designer__container">
                <HorizontalFixedScroll>
                    <div class="workflow-designer__container">
                        <div class="workflow-designer__space-container">
                            <div class="workflow-designer__extender" />
                            <WorkflowDesignerDefaultStatusPlaceholder v-if="isPlaceholderVisible" />
                            <Designer
                                :columns="statuses.length"
                                :column-width="columnWidth"
                                :row-height="rowHeight">
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
                                                :obstacle-columns="[2,3]"
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
                                            ref="designerDraggableLayerHeader"
                                            v-for="column in columns"
                                            :key="column"
                                            :status="statuses[column - 1]"
                                            :has-right-border="column === columns" />
                                        <WorkflowDesignerGhostButton
                                            v-if="ghostIndex !== -1"
                                            v-bind="{ ...ghostButtonBounds }"
                                            @click.native="addTransitionLine" />
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
import Designer from '@UI/components/Designer/Designer';
import DesignerBackgroundLayer from '@UI/components/Designer/DesignerBackgroundLayer';
import DesignerDraggableLayer from '@UI/components/Designer/DesignerDraggableLayer';
import HorizontalFixedScroll from '@UI/components/Layout/Scroll/HorizontalFixedScroll';
import VerticalFixedScroll from '@UI/components/Layout/Scroll/VerticalFixedScroll';
import Preloader from '@UI/components/Preloader/Preloader';
import {
    getBackgroundItem,
} from '@UI/models/designer/intex';
import {
    getFixedMousePosition,
    isMouseOutsideElement,
} from '@UI/models/mouse';
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
import {
    WORKFLOW_STATUS_CREATED_EVENT_NAME,
} from '@Workflow/defaults';
import {
    COLUMN_WIDTH,
    HEADER_HEIGHT,
    ROW_HEIGHT,
} from '@Workflow/defaults/designer';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'WorkflowDesigner',
    components: {
        WorkflowDesignerGhostButton,
        WorkflowDesignerBackgroundItem,
        WorkflowDesignerDefaultStatusPlaceholder,
        WorkflowDesignerIllustrationPlaceholder,
        DesignerBackgroundLayer,
        WorkflowDesignerHeaderLayerCell,
        Preloader,
        Designer,
        DesignerDraggableLayer,
        VerticalFixedScroll,
        HorizontalFixedScroll,
    },
    async fetch() {
        this.getWorkflow({
            onSuccess: this.onFetchDataSuccess,
            onError: this.onFetchDataError,
        });
    },
    data() {
        return {
            isFetchingData: true,
            excludeRows: [
                1,
                3,
            ],
        };
    },
    computed: {
        ...mapState('workflow', [
            'statuses',
            'transitions',
        ]),
        ...mapState('draggable', [
            'draggedElement',
            'ghostIndex',
            'isElementDragging',
        ]),
        isPlaceholderVisible() {
            return this.statuses.length < 2;
        },
        columnWidth() {
            return `minmax(${COLUMN_WIDTH}px, max-content)`;
        },
        rowHeight() {
            return ROW_HEIGHT;
        },
        ghostButtonBounds() {
            const {
                row,
                column,
            } = this.ghostIndex;
            const headerRow = 1;

            // row +1 = bo jest jeszcze header
            return {
                row: row + headerRow,
                column,
                rowHeight: this.rowHeight,
            };
        },
    },
    mounted() {
        document.documentElement.addEventListener(
            WORKFLOW_STATUS_CREATED_EVENT_NAME,
            this.onWorkflowStatusCreated,
        );
    },
    beforeDestroy() {
        document.documentElement.removeEventListener(
            WORKFLOW_STATUS_CREATED_EVENT_NAME,
            this.onWorkflowStatusCreated,
        );
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        ...mapActions('workflow', [
            'getWorkflow',
        ]),
        onWorkflowStatusCreated() {
            this.isFetchingData = true;

            this.getWorkflow({
                onSuccess: this.onFetchDataSuccess,
                onError: this.onFetchDataError,
            });
        },
        onFetchDataSuccess() {
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
        addTransitionLine() {
            console.log('add');
        },
        onMouseMove(event) {
            event.preventDefault();

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

                this.__setState({
                    key: 'ghostIndex',
                    value: {
                        row,
                        column,
                    },
                });
            } else {
                this.__setState({
                    key: 'ghostIndex',
                    value: -1,
                });
            }
        },
        onMouseLeave(event) {
            if (this.isOutOfBounds(event) && this.ghostIndex !== -1) {
                this.__setState({
                    key: 'ghostIndex',
                    value: -1,
                });
            }
        },
        isOutOfBounds(event) {
            const {
                xPos,
                yPos,
            } = getFixedMousePosition(event);

            return isMouseOutsideElement(this.$refs.designerDraggableLayer.$el, xPos, yPos);
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
            padding: 24px 24px 24px 48px;
        }

        &__extender {
            flex: 1 1 100%;
        }
    }
</style>
