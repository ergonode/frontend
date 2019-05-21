/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {coordinatesAreBetween} from '~/model/coordinate_system/CoordinatesHelper';

describe('CoordinatesHelper/coordinatesAreBetween', () => {
  it('If coordinates are between', () => {
    const fun = coordinatesAreBetween(
      {
        xPos: {start: 3, end: 1},
        yPos: {start: 8, end: 9},
      },
      {
        xPos: {start: 1, end: 5},
        yPos: {start: 5, end: 10},
      });
    expect(fun).toBeTruthy();
  });

  it('If coordinates are not between', () => {
    const fun = coordinatesAreBetween(
      {
        xPos: {start: 0, end: 1},
        yPos: {start: 2, end: 9},
      },
      {
        xPos: {start: 1, end: 5},
        yPos: {start: 5, end: 10},
      });
    expect(fun).toBeFalsy();
  });
});
