/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="grid-items-container"
        :draggable="true"
        @dragstart="onDragStart"
        @dragend="onDragEnd">
        <slot />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { setTimeout } from 'timers';

export default {
    name: 'TemplateGridItemsContainer',
    data: () => ({
        categoryBounds: [],
    }),
    methods: {
        ...mapActions('draggable', [
            'setDraggedElement',
        ]),
        initializeRowBounds() {
            const { children: categories } = this.$el;
            const { length } = categories;
            for (let i = 0; i < length; i += 1) {
                const bounds = categories[i].getBoundingClientRect();
                this.categoryBounds.push(bounds);
            }
        },
        getRowBellowMouse({ clientY, categories }, completion) {
            const { length } = categories;
            for (let i = 0; i < length; i += 1) {
                const { y, height } = this.categoryBounds[i];
                if (y <= clientY && y + height >= clientY) {
                    return completion({ index: i, category: categories[i] });
                }
            }
            return null;
        },
        createColumnCopy({ event, category }) {
            const categoryId = category.getAttribute('item-id');
            const clonedDOMElement = category.cloneNode(true);
            const clonedDOMElementStyle = `
                position: absolute;
                background-color: '#fff';
                height: 40px;
                width: 200px;
            `;
            clonedDOMElement.setAttribute('style', clonedDOMElementStyle);
            clonedDOMElement.classList.add('cloned-category-element');
            document.body.appendChild(clonedDOMElement);
            event.dataTransfer.setDragImage(clonedDOMElement, clonedDOMElement.offsetWidth / 2, 0);
            event.dataTransfer.setData('text/plain', categoryId);
        },
        onDragStart(event) {
            const { clientY } = event;
            const { children: categories } = this.$el;
            this.initializeRowBounds();
            this.getRowBellowMouse({ clientY, categories }, ({ index, category }) => {
                if (category) {
                    const categoryId = category.getAttribute('item-id');
                    this.setDraggedElement(categoryId);
                    this.createColumnCopy({ event, category });
                    setTimeout(() => {
                        this.$emit('removeItem', index);
                        // this.$emit('removeItem', 'ghost_item');
                    }, 1);
                    return true;
                }
                return false;
            });
        },
        onDragEnd(event) {
            const clonedDOMElement = document.documentElement.querySelector('.cloned-category-element');
            document.body.removeChild(clonedDOMElement);
            event.dataTransfer.clearData();
            this.categoryBounds = [];
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-items-container {
        position: absolute;
        top: 0;
        display: grid;
        width: 100%;
        height: auto;
    }
</style>
