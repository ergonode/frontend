/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
  convertSize,
  getImageData,
} from '~/model/multimedia';

describe('multimedia/convertSize', () => {
  it('Convert number to KB', () => {
    const size = 1000;
    const result = convertSize(size);
    expect(result).toBe('0.977 KB');
  });

  it('Convert number to MB', () => {
    const size = 1000;
    const result = convertSize(size, 'MB');
    expect(result).toBe('0.001 MB');
  });

  it('Set null if no data', () => {
    const result = convertSize();
    expect(result).toBeNull();
  });

});

describe('multimedia/getImageData', () => {
  it('Get null when no data', () => {
    const obj = null;
    const result = getImageData(obj);
    expect(result).toBeNull();
  });

  it('Get image data when correct data and no header', () => {
    const obj = [73, 32, 194, 189, 32, 226, 153, 165, 32, 240, 159, 146, 169];
    const result = getImageData(obj);
    expect(result).toBe("data:image/png;base64,SSDCvSDimaUg8J+SqQ==");
  });
});
