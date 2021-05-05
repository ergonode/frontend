/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="workflow-designer">
        <VerticalFixedScroll>
            <div class="workflow-designer__container">
                <HorizontalFixedScroll>
                    <div class="workflow-designer__container">
                        <div class="workflow-designer__space-container">
                            <div class="workflow-designer__extender" />
                            <Designer
                                :columns="20"
                                column-width="minmax(144px, max-content)">
                                <template #appendBody="{ layerStyle }">
                                    <DesignerDraggableLayer :style="layerStyle" />
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
import Designer from '@UI/components/Designer/Designer';
import DesignerDraggableLayer from '@UI/components/Designer/DesignerDraggableLayer';
import HorizontalFixedScroll from '@UI/components/Layout/Scroll/HorizontalFixedScroll';
import VerticalFixedScroll from '@UI/components/Layout/Scroll/VerticalFixedScroll';

export default {
    name: 'WorkflowDesigner',
    components: {
        Designer,
        DesignerDraggableLayer,
        VerticalFixedScroll,
        HorizontalFixedScroll,
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
