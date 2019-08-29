/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */

function encode(input) {
    const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    let chr1; let chr2; let chr3; let enc1; let enc2; let enc3; let
        enc4;
    let i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (Number.isNaN(chr2)) {
            enc3 = 64;
            enc4 = 64;
        } else if (Number.isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2)
            + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}

export function convertSize(size, unit = 'KB') {
    const number = unit === 'MB' ? (size / 1024 / 1024) : (size / 1024);
    return size ? `${(number).toFixed(3)} ${unit}` : null;
}

export function getImageData(arrayBuffer) {
    if (!arrayBuffer) return null;
    const bytes = new Uint8Array(arrayBuffer);
    return `data:image/png;base64,${encode(bytes)}`;
}
