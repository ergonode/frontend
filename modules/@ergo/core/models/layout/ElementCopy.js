/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import DraggedElement from '@Core/components/DraggedElement/DraggedElement';
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
    event.dataTransfer.setDragImage(instance.$el, instance.$el.offsetWidth / 2, instance.$el.offsetHeight / 2);
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
