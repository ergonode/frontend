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
                            <Designer
                                :columns="statuses.length"
                                column-width="minmax(144px, max-content)">
                                <template
                                    #backgroundBody="{
                                        rows,
                                        columns,
                                        layerStyle,
                                    }">
                                    <DesignerBackgroundLayer
                                        :style="{
                                            ...layerStyle,
                                            gridTemplateRows: `40px ${layerStyle.gridTemplateRows}`
                                        }"
                                        :columns="columns"
                                        :rows="rows">
                                        <div
                                            v-for="column in columns"
                                            :key="column" />
                                        <template #item="{ row, column }">
                                            <DesignerBackgroundItem
                                                :key="`${column} | ${row}`"
                                                :column="column"
                                                :row="row"
                                                :has-right-border="column + 1 === columns" />
                                        </template>
                                    </DesignerBackgroundLayer>
                                </template>
                                <template #appendBody="{ columns, layerStyle }">
                                    <DesignerDraggableLayer
                                        :style="{
                                            ...layerStyle,
                                            gridTemplateRows: `40px ${layerStyle.gridTemplateRows}`
                                        }">
                                        <WorkflowDesignerHeaderLayerCell
                                            v-for="column in columns"
                                            :key="column"
                                            :status="statuses[column - 1]"
                                            :has-right-border="column === columns" />
                                    </DesignerDraggableLayer>
                                </template>
                            </Designer>
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
import WorkflowDesignerHeaderLayerCell
    from '@Modules/@ergonode/workflow/src/components/Designers/WorkflowDesignerHeaderLayerCell';
import Designer from '@UI/components/Designer/Designer';
import DesignerBackgroundItem from '@UI/components/Designer/DesignerBackgroundItem';
import DesignerBackgroundLayer from '@UI/components/Designer/DesignerBackgroundLayer';
import DesignerDraggableLayer from '@UI/components/Designer/DesignerDraggableLayer';
import HorizontalFixedScroll from '@UI/components/Layout/Scroll/HorizontalFixedScroll';
import VerticalFixedScroll from '@UI/components/Layout/Scroll/VerticalFixedScroll';
import Preloader from '@UI/components/Preloader/Preloader';
import {
    WORKFLOW_STATUS_CREATED_EVENT_NAME,
} from '@Workflow/defaults';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'WorkflowDesigner',
    components: {
        DesignerBackgroundLayer,
        DesignerBackgroundItem,
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
        };
    },
    computed: {
        ...mapState('workflow', [
            'statuses',
            'transitions',
        ]),
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
