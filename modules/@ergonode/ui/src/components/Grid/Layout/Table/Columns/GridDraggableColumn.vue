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
    name: 'GridDraggableColumn',
    inject: [
        'getGridTableLayoutReference',
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
        onDragStart(event) {
            if (this.isResizing) return false;

            const [
                header,
            ] = this.$el.children;
            const isMouseAboveColumnHeader = event.offsetY < header.offsetHeight;

            if (!isMouseAboveColumnHeader) {
                event.preventDefault();
                event.stopPropagation();

                return false;
            }

            this.$el.classList.remove('grid-column--hovered');

            const [
                code,
                languageCode,
            ] = this.column.id.split(':');
            const title = this.column.label || `#${code}`;
            const languageTitle = languageCode ? languageCode.toUpperCase() : '';

            addElementCopyToDocumentBody({
                event,
                id: this.column.id,
                label: `${title} ${languageTitle}`,
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

            if (this.isOverDropZone && this.column.deletable) {
                this.__setState({
                    key: 'isOverDropZone',
                    value: false,
                });

                this.$emit('remove', this.index);
            } else if (this.ghostIndex !== this.draggedElIndex) {
                this.$emit('swap', {
                    from: this.draggedElIndex,
                    to: this.ghostIndex,
                });
            }

            this.$el.classList.add('grid-column--hovered');

            this.removeColumnsTransform();
            this.resetDraggedElementCache();
            this.__setState({
                key: 'isElementDragging',
                value: null,
            });
        },
        onDragOver(event) {
            if (this.draggedElIndex === -1) {
                return false;
            }
            event.preventDefault();

            const {
                pageX,
            } = event;
            const {
                x: columnXPos, width: columnWidth,
            } = this.$el.getBoundingClientRect();
            const isBefore = getDraggedColumnPositionState(
                pageX,
                columnXPos,
                columnWidth,
            );
            const fixedIndex = this.getColumnFixedIndex();

            if ((this.index === this.draggedElIndex && this.ghostIndex !== -1)
                    || (isBefore && this.ghostIndex === fixedIndex - 1)
                    || (!isBefore && this.ghostIndex === fixedIndex + 1)
                    || this.isElementDragging === DRAGGED_ELEMENT.FILTER) {
                event.preventDefault();
                event.stopPropagation();

                return false;
            }

            const targetGhostIndex = this.getTargetGhostIndex(isBefore);
            const contentGrid = this.getGridContentElement();

            getColumnsTransform().then((response) => {
                const transforms = response.default({
                    targetGhostIndex,
                    draggedElIndex: this.draggedElIndex,
                    ghostIndex: this.ghostIndex,
                    columnsSection: contentGrid,
                });

                this.updateColumnsTransform(transforms);

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
            const contentGrid = this.getGridContentElement();

            Object.keys(transforms).forEach((index) => {
                contentGrid.children[index].style.transform = `translateX(${transforms[index]}px)`;
            });

            contentGrid.children[this.draggedElIndex].style.transform = `translateX(${updatedGhostTransform}px)`;
        },
        getColumnFixedIndex() {
            if (this.$el.style.transform) {
                const xTransform = this.getElementTransform();

                if (xTransform) {
                    if (xTransform > 0) return this.index + 1;

                    return this.index - 1;
                }
            }

            return this.index;
        },
        getElementTransform() {
            return +this.$el.style.transform.replace(/[^0-9\-.,]/g, '');
        },
        getGridContentElement() {
            return this.getGridTableLayoutReference().querySelector('.grid-table-layout-columns-section');
        },
        getTargetGhostIndex(isBefore) {
            if (this.index < this.draggedElIndex) {
                return isBefore ? this.index : this.index + 1;
            }

            return isBefore ? this.index - 1 : this.index;
        },
        removeColumnsTransform() {
            const contentGrid = this.getGridContentElement();
            const {
                length,
            } = contentGrid.children;

            for (let i = 0; i < length; i += 1) {
                contentGrid.children[i].style.transform = null;
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
                key: 'draggedInScope',
                value: '',
            });
        },
    },
    render() {
        return this.$scopedSlots.default();
    },
};
</script>
