/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '@Core/models/layout/ElementCopy';
import {
    getDraggedColumnPositionState,
} from '@UI/models/dragAndDrop/helpers';
import {
    mapActions,
    mapState,
} from 'vuex';

const getColumnsTransform = () => import('@UI/models/dragAndDrop/getColumnsTransforms');

export default {
    name: 'WorkflowDesignerDraggableColumnLayer',
    inject: [
        'getWorkflowDesignerReference',
    ],
    props: {
        /**
         * Context scope
         */
        scope: {
            type: String,
            default: '',
        },
        /**
         * Index of given component at the loop
         */
        index: {
            type: Number,
            required: true,
        },
        /**
         * Data of the column
         */
        column: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
            'isOverDropZone',
            'draggedElement',
            'ghostIndex',
            'draggedElIndex',
        ]),
    },
    mounted() {
        if (this.$slots.default[0].elm) {
            const {
                elm,
            } = this.$slots.default[0];

            elm.addEventListener(
                'dragstart',
                this.onDragStart,
                true,
            );
            elm.addEventListener(
                'dragend',
                this.onDragEnd,
                true,
            );
            elm.addEventListener(
                'drop',
                this.onDrop,
                true,
            );
            elm.addEventListener(
                'dragover',
                this.onDragOver,
                true,
            );

            elm.setAttribute('draggable', true);
        }
    },
    beforeDestroy() {
        if (this.$slots.default[0].elm) {
            const {
                elm,
            } = this.$slots.default[0];

            elm.removeEventListener(
                'dragstart',
                this.onDragStart,
                true,
            );
            elm.removeEventListener(
                'dragend',
                this.onDragEnd,
                true,
            );
            elm.removeEventListener(
                'drop',
                this.onDrop,
                true,
            );
            elm.removeEventListener(
                'dragover',
                this.onDragOver,
                true,
            );
        }
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
            'setGhostElXTranslation',
        ]),
        getGridContentNodeList() {
            return this.getWorkflowDesignerReference().$el.querySelectorAll('.workflow-designer-header-layer-cell');
        },
        getOverlayColumnsNodeList() {
            return this.getWorkflowDesignerReference().$el.querySelector('.designer-virtual-overlay');
        },
        onDragStart(event) {
            const label = this.column.name || `#${this.column.code}`;

            addElementCopyToDocumentBody({
                event,
                id: this.column.id,
                label,
            });

            this.__setState({
                key: 'ghostIndex',
                value: this.index,
            });
            this.__setState({
                key: 'draggedElIndex',
                value: this.index,
            });
            this.__setState({
                key: 'draggedElement',
                value: this.column,
            });
            this.__setState({
                key: 'draggedInScope',
                value: this.scope,
            });
            this.__setState({
                key: 'isElementDragging',
                value: DRAGGED_ELEMENT.COLUMN,
            });

            return true;
        },
        onDrop(event) {
            event.preventDefault();
        },
        onDragEnd(event) {
            removeElementCopyFromDocumentBody(event);

            if (this.ghostIndex !== this.draggedElIndex) {
                this.$emit('swap', {
                    from: this.draggedElIndex,
                    to: this.ghostIndex,
                });
            }

            this.removeColumnsTransform();
            this.removeOverlayColumnsTransform();
            this.resetDraggedElementCache();
        },
        onDragOver(event) {
            if (this.draggedElIndex === -1 || !this.$slots.default[0].elm) {
                return false;
            }
            event.preventDefault();

            const {
                elm,
            } = this.$slots.default[0];
            const {
                pageX,
            } = event;
            const {
                x: columnXPos, width: columnWidth,
            } = elm.getBoundingClientRect();
            const isBefore = getDraggedColumnPositionState(
                pageX,
                columnXPos,
                columnWidth,
            );
            const fixedIndex = this.getColumnFixedIndex();

            if ((this.index === this.draggedElIndex && this.ghostIndex !== -1)
                    || (isBefore && this.ghostIndex === fixedIndex - 1)
                    || (!isBefore && this.ghostIndex === fixedIndex + 1)) {
                event.preventDefault();
                event.stopPropagation();

                return false;
            }

            const targetGhostIndex = this.getTargetGhostIndex(isBefore);
            const contentGridNodeList = this.getGridContentNodeList();
            const contentOverlayColumnsNodeList = this.getOverlayColumnsNodeList();

            getColumnsTransform().then((response) => {
                const transforms = response.default({
                    targetGhostIndex,
                    draggedElIndex: this.draggedElIndex,
                    ghostIndex: this.ghostIndex,
                    columnsNodeList: contentGridNodeList,
                });
                this.updateColumnsTransform(transforms);

                if (contentOverlayColumnsNodeList) {
                    const transformsOverlay = response.default({
                        targetGhostIndex,
                        draggedElIndex: this.draggedElIndex,
                        ghostIndex: this.ghostIndex,
                        columnsSection: contentOverlayColumnsNodeList,
                    });

                    this.updateOverlayColumnsTransform(transformsOverlay);
                }
                this.__setState({
                    key: 'ghostIndex',
                    value: targetGhostIndex,
                });
            });

            return true;
        },
        updateColumnsTransform({
            transforms,
            updatedGhostTransform,
        }) {
            const contentGridNodeList = this.getGridContentNodeList();

            Object.keys(transforms).forEach((index) => {
                contentGridNodeList[index].style.transform = `translateX(${transforms[index]}px)`;
            });

            contentGridNodeList[this.draggedElIndex].style.transform = `translateX(${updatedGhostTransform}px)`;
        },
        updateOverlayColumnsTransform({
            transforms,
            updatedGhostTransform,
        }) {
            const contentOverlayColumnsNodeList = this.getOverlayColumnsNodeList();

            Object.keys(transforms).forEach((index) => {
                contentOverlayColumnsNodeList.children[index].style.transform = `translateX(${transforms[index]}px)`;
            });

            contentOverlayColumnsNodeList.children[this.draggedElIndex].style.transform = `translateX(${updatedGhostTransform}px)`;
        },
        getTargetGhostIndex(isBefore) {
            if (this.index < this.draggedElIndex) {
                return isBefore ? this.index : this.index + 1;
            }

            return isBefore ? this.index - 1 : this.index;
        },
        getColumnFixedIndex() {
            if (this.$slots.default[0].elm && this.$slots.default[0].elm.style.transform) {
                const xTransform = this.getElementTransform();

                if (xTransform) {
                    if (xTransform > 0) return this.index + 1;

                    return this.index - 1;
                }
            }

            return this.index;
        },
        getElementTransform() {
            const {
                elm,
            } = this.$slots.default[0];

            return +elm.style.transform.replace(/[^0-9\-.,]/g, '');
        },
        removeColumnsTransform() {
            const contentGridNodeList = this.getGridContentNodeList();

            for (let i = 0; i < contentGridNodeList.length; i += 1) {
                contentGridNodeList[i].style.transform = null;
            }
        },
        removeOverlayColumnsTransform() {
            const contentOverlayColumnsNodeList = this.getOverlayColumnsNodeList();

            if (contentOverlayColumnsNodeList) {
                for (let i = 0; i < contentOverlayColumnsNodeList.children.length; i += 1) {
                    contentOverlayColumnsNodeList.children[i].style.transform = null;
                }
            }
        },
        resetDraggedElementCache() {
            this.__setState({
                key: 'ghostIndex',
                value: -1,
            });
            this.__setState({
                key: 'draggedElIndex',
                value: -1,
            });
            this.__setState({
                key: 'draggedElement',
                value: null,
            });
            this.__setState({
                key: 'draggedInScope',
                value: '',
            });
            this.__setState({
                key: 'isElementDragging',
                value: null,
            });
        },
    },
    render() {
        return this.$scopedSlots.default();
    },
};
</script>
