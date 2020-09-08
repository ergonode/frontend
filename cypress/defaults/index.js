/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const LANGUAGE = Cypress.env('defaultLanguage');

export const DICTIONARIES = {
    types: `${LANGUAGE}/dictionary/attributes/types`,
    curr: `${LANGUAGE}/dictionary/currencies`,
    units: `${LANGUAGE}/units?view=list`,
    date: `${LANGUAGE}/dictionary/date_format`,
    channels: `${LANGUAGE}/dictionary/channels`,
    prodTypes: `${LANGUAGE}/dictionary/product-type`,
    priv: `${LANGUAGE}/dictionary/privileges`,
    sour: `${LANGUAGE}/dictionary/sources`,
    lang: `${LANGUAGE}/languages?limit=9999&offset=0&view=list&field=name&order=ASC`,
    langTree: `${LANGUAGE}/language/tree`,
};
