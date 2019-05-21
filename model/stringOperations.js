/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function toCapitalize(string) {
    return string.replace(
        /^\w/, c => c.toUpperCase(),
    );
}

export function capitalizeAndConcatenationArray(strings) {
    let string = '';
    strings.forEach((s) => {
        const lowerCasedString = s.toLowerCase();
        const capitalizedString = toCapitalize(lowerCasedString);
        string += capitalizedString;
    });

    return string;
}
