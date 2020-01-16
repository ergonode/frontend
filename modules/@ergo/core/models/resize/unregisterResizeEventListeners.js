/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function (doResizeDrag, stopResizeDrag) {
    document.documentElement.removeEventListener(
        'mousemove',
        doResizeDrag,
        false,
    );
    document.documentElement.removeEventListener(
        'mouseup',
        stopResizeDrag,
        false,
    );
}
