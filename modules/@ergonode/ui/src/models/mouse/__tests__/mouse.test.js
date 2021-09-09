/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    isMouseOutsideElement,
} from '@UI/models/mouse';
import {
    MockedElement,
} from '@UI/models/mouse/__tests__/__mocks__/mouse.mock';

describe('mouse/isMouseOutsideElement', () => {
    it('Is outside', () => {
        const isOutside = isMouseOutsideElement(new MockedElement(
            100,
            200,
            100,
            200,
            100,
            100,
        ), 0, 0);

        expect(isOutside).toBeTruthy();
    });

    it('Is inside', () => {
        const isOutside = isMouseOutsideElement(new MockedElement(
            0,
            100,
            0,
            100,
            100,
            100,
        ), 0, 0);

        expect(isOutside).toBeFalsy();
    });

    it('Arguments are not set', () => {
        const isOutside = isMouseOutsideElement();

        expect(isOutside).toBeFalsy();
    });
});
