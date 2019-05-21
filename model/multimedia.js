/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function convertSize(size, unit = 'KB') {
    const number = unit === 'MB' ? (size / 1024 / 1024) : (size / 1024);
    return size ? `${(number).toFixed(3)} ${unit}` : null;
}

export function getImageData(arrayBuffer) {
    if (!arrayBuffer) return null;
    const image = btoa(new Uint8Array(arrayBuffer)
        .reduce((information, byte) => information + String.fromCharCode(byte), ''));
    return `data:'image/png'};base64,${image}`;
}
