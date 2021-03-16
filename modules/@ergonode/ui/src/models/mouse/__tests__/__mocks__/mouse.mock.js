/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export class MockedElement {
    constructor(top, right, left, bottom, width, height) {
        this.top = top;
        this.right = right;
        this.left = left;
        this.bottom = bottom;
        this.width = width;
        this.height = height;
    }

    getBoundingClientRect() {
        return {
            top: this.top,
            right: this.right,
            left: this.left,
            bottom: this.bottom,
            width: this.width,
            height: this.height,
        };
    }
}
