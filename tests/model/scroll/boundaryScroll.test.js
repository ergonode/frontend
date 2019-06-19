/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
  rightBound,
  leftBound,
  topBound,
  bottomBound,
} from '~/model/scroll/boundaryScroll';

describe('boundaryScroll/rightBound', () => {
  it('That same values', () => {
    const obj = {xOffset: 6, maxWidth: 6};
    const result = rightBound(obj);
    expect(result).toBeTruthy();
  });

  it('Different values', () => {
    const obj = {xOffset: 6, maxWidth: 3};
    const result = rightBound(obj);
    expect(result).toBeFalsy();
  });

  it('The input object is empty', () => {
    const obj = {};
    const result = rightBound(obj);
    expect(result).toBeFalsy();
  });
});

describe('boundaryScroll/leftBound', () => {
  it('X offset is equal to 0', () => {
    const obj = {xOffset: 0};
    const result = leftBound(obj);
    expect(result).toBeTruthy();
  });

  it('X offset is different from 0', () => {
    const obj = {xOffset: 6};
    const result = leftBound(obj);
    expect(result).toBeFalsy();
  });

  it('The input object is empty', () => {
    const obj = {};
    const result = leftBound(obj);
    expect(result).toBeFalsy();
  });
});

describe('boundaryScroll/topBound', () => {
  it('Y offset is equal to 0', () => {
    const obj = {yOffset: 0};
    const result = topBound(obj);
    expect(result).toBeTruthy();
  });

  it('Y offset is different from 0', () => {
    const obj = {yOffset: 6};
    const result = topBound(obj);
    expect(result).toBeFalsy();
  });

  it('The input object is empty', () => {
    const obj = {};
    const result = topBound(obj);
    expect(result).toBeFalsy();
  });
});


describe('boundaryScroll/bottomBound', () => {
  it('That same values', () => {
    const obj = {yOffset: 6, maxHeight: 6};
    const result = bottomBound(obj);
    expect(result).toBeTruthy();
  });

  it('Different values', () => {
    const obj = {yOffset: 6, maxHeight: 3};
    const result = bottomBound(obj);
    expect(result).toBeFalsy();
  });

  it('The input object is empty', () => {
    const obj = {};
    const result = bottomBound(obj);
    expect(result).toBeFalsy();
  });
});
