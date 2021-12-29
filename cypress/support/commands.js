/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import 'cypress-file-upload';

// Benchmark
// const commands = [];

// Cypress.on('test:after:run', (attributes) => {
//     console.log('Test "%s" has finished in %dms',
//         attributes.title, attributes.duration);
//     console.table(commands);
//     commands.length = 0;
// });

// Cypress.on('command:start', (c) => {
//     commands.push({
//         name: c.attributes.name,
//         args: c.attributes.args.toString(),
//         started: +new Date(),
//     });
// });

// Cypress.on('command:end', (c) => {
//     const lastCommand = commands[commands.length - 1];

//     if (lastCommand.name !== c.attributes.name) {
//         throw new Error('Last command is wrong');
//     }

//     lastCommand.endedAt = +new Date();
//     lastCommand.elapsed = `${lastCommand.endedAt - lastCommand.started} ms`;
// });
// Benchmark

const getSelectedOption = (scrollContainer, optionElement, scrollTop, option) => {
    const newScrollTop = scrollTop + 100;

    let hasOption = false;

    cy.get(optionElement).each(($option) => {
        if ($option.text().trim() === option) {
            hasOption = true;
            cy.wrap($option).as('selectedOption');

            return false;
        }

        return true;
    }).then(() => {
        if (!hasOption) {
            cy.get(scrollContainer).scrollTo(0, newScrollTop);

            getSelectedOption(scrollContainer, optionElement, newScrollTop, option);
        }
    });
};

Cypress.Commands.add('getBySel', (selector, ...args) => cy.get(`[data-cy=${selector}]`, ...args));

Cypress.Commands.add('getBySelLike', (selector, ...args) => cy.get(`[data-cy*=${selector}]`, ...args));

Cypress.Commands.add('checkUrl', (page) => {
    const url = page.replace(/%\w+%/g, '(.*?)');

    cy.url().should('match', new RegExp(url));
});

Cypress.Commands.add('login', (email, pass) => {
    cy.getCookie('token')
        .then((token) => {
            if (!token) {
                cy.visit({
                    url: '',
                    log: false,
                    retryOnNetworkFailure: false,
                });
                cy.intercept(
                    {
                        method: 'POST',
                        url: /login/,
                    },
                ).as('postLogin');
                cy.intercept(
                    {
                        method: 'GET',
                        url: /profile/,
                    },
                ).as('profile');

                cy
                    .get('[data-cy=login-email]')
                    .find('input')
                    .fill(email)
                    .should('have.value', email);
                cy
                    .get('[data-cy=login-pass]')
                    .find('input')
                    .fill(pass)
                    .should('have.value', pass);
                cy
                    .get('[data-cy=submit]')
                    .click();

                cy
                    .wait('@postLogin')
                    .its('response.statusCode')
                    .should('eq', 200);
                cy
                    .wait('@profile')
                    .its('response.statusCode')
                    .should('eq', 200);
            }
        });
});

Cypress.Commands.add('logout', () => {
    cy
        .get('[data-cy=tool-bar-dropdown]')
        .click();
    cy
        .get('[data-cy=tool-bar-content]')
        .should('be.visible');
    cy
        .get('[data-cy=logout-button]')
        .click();
    cy
        .url()
        .should('include', '');
});

Cypress.Commands.add('selectRandomUser', () => {
    cy
        .get('.action-link')
        .then((links) => {
            const {
                length,
            } = links;
            links[length - 1].click();
        });
    cy
        .url()
        .should('include', 'users/edit');
});

Cypress.on('uncaught:exception', (err) => {
    console.log(err);
    return false;
});

Cypress.Commands.add('checkRequest', ({
    requestAlias, statusCode,
}) => {
    cy
        .wait(requestAlias)
        .its('response.statusCode')
        .should('eq', statusCode);
});

Cypress.Commands.add('sendRequest', ({
    requestName, requestType, status,
}) => {
    cy
        .wait(`@${requestName}_${requestType}`)
        .then((xhr) => {
            expect(xhr.request.method).to.equal(requestType);
            expect(xhr.response.statusCode).to.equal(status);
        });
});

Cypress.Commands.add('openPage', ({
    page, requestAliases = [],
}) => {
    cy.visit({
        url: page,
        log: false,
        retryOnNetworkFailure: false,
    });
    cy.checkUrl(page);
    cy.wrap(requestAliases)
        .each((requestAlias) => {
            cy.checkRequest({
                requestAlias,
                statusCode: 200,
            });
        });
});

Cypress.Commands.add('fill', {
    prevSubject: 'element',
}, (subject, value) => {
    cy.wrap(subject).invoke('val', value).trigger('input').trigger('change');
});

Cypress.Commands.add('chooseSelectOption', {
    prevSubject: 'element',
}, (subject, value) => {
    const id = subject.selector.match(/\[data-cy=(.*[^\]])/i)[1];

    cy.wrap(subject)
        .click();
    cy.get(`[data-cy=${id}-dropdown]`)
        .should('be.visible')
        .as('dropdown');
    cy.get('@dropdown')
        .find('.vue-recycle-scroller')
        .should('be.visible')
        .as('virtualScroll');
    cy.get('@virtualScroll')
        .find('.list-element')
        .should('be.visible')
        .as('option');

    getSelectedOption('@virtualScroll', '@option', 0, value);

    cy.get('@selectedOption')
        .click({
            force: true,
        });
    cy.getBySel(`${id}-value`)
        .contains(value);
    cy.get('@dropdown')
        .should('be.not.visible');
});
