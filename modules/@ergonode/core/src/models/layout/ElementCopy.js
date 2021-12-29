/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import DraggedElement from '@UI/components/DraggedElement/DraggedElement';
// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';

let instance = null;

export function addElementCopyToDocumentBody({
    event,
    id,
    label,
}) {
    const ComponentClass = Vue.extend(DraggedElement);
    instance = new ComponentClass({
        propsData: {
            label,
        },
    });
    instance.$mount();
    document.body.appendChild(instance.$el);

    const {
        offsetWidth,
        offsetHeight,
    } = instance.$el;

    event.dataTransfer.setDragImage(instance.$el, offsetWidth / 2, offsetHeight / 2);
    event.dataTransfer.setData('text/plain', id);
}

export function removeElementCopyFromDocumentBody(event) {
    document.body.removeChild(instance.$el);
    instance.$destroy();
    instance = null;

    if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
        // TODO: Only Firefox Error: Modifications are not allowed for this document
        // check why firefox does not support clearData
        event.dataTransfer.clearData();
    }
}
