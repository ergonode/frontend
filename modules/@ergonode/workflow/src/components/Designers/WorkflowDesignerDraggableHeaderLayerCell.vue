/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'WorkflowDesignerDraggableHeaderLayerCell',
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
        ]),
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

            this.resetDraggedElementCache();
        },
        onDragOver(event) {
            event.preventDefault();
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
