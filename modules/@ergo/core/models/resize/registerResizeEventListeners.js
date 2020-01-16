/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function (doResizeDrag, stopResizeDrag) {
    document.documentElement.addEventListener(
        'mousemove',
        doResizeDrag,
        false,
    );
    document.documentElement.addEventListener(
        'mouseup',
        stopResizeDrag,
        false,
    );
}
