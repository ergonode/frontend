/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import Vuex from 'vuex';

import actions from '../actions';
import defaultState from '../state';

let store;
let mockAxiosGetResult;

Vue.use(Vuex);

jest.mock('axios', () => ({
    $get: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
    $post: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
    $patch: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
}));
let action;
const $setLoader = jest.fn();
const $removeLoader = jest.fn();

actions.__setState = ({
    commit,
}, payload) => {
    commit('__SET_STATE', payload);
};

const testedAction = (context = {}, payload = {}) => actions[action]
    .bind({
        app: {
            $axios: axios,
        },
        $setLoader,
        $removeLoader,
    })(context, payload);

const mutations = {
    __SET_STATE(state, {
        key, value,
    }) {
        state[key] = value;
    },
};

describe('Notifications', () => {
    beforeEach(() => {
        store = new Vuex.Store({
            state: defaultState(),
            getters: {},
            mutations,
            actions,
        });
    });

    describe('actions', () => {
        let commit;
        let dispatch;

        beforeEach(() => {
            commit = store.commit;
            dispatch = store.dispatch;
        });

        it('Requesting for notifications', async () => {
            const mockedNotification = {
                id: '1',
                author: 'Jan kowalski',
                message: 'Super!!',
                avatar_id: 'abcde1234',
                read_at: null,
            };

            action = 'requestForNotifications';
            mockAxiosGetResult = {
                collection: [
                    mockedNotification,
                ],
                info: {
                    count: 1,
                },
            };

            await testedAction({
                commit,
                dispatch,
                state: store.state,
            });
            expect(store.state.notifications.length).toBe(1);
            expect(store.state.notifications[0]).toStrictEqual(mockedNotification);
        });

        it('Setting up notifications limit', () => {
            action = '__setState';

            testedAction({
                commit,
            }, {
                key: 'limit',
                value: 100,
            });
            expect(store.state.limit).toBe(100);
        });

        it('Increasing time interval', () => {
            action = 'increaseRequestTimeInterval';

            testedAction({
                commit,
                state: store.state,
            });
            expect(store.state.requestTimeInterval).toBe(2000);

            testedAction({
                commit,
                state: store.state,
            });
            expect(store.state.requestTimeInterval).toBe(4000);

            const fiveMinutesInMs = 300000;

            commit('__SET_STATE', {
                key: 'requestTimeInterval',
                value: fiveMinutesInMs,
            });

            testedAction({
                commit,
                state: store.state,
            });
            expect(store.state.requestTimeInterval).toBe(fiveMinutesInMs);

            commit('__SET_STATE', {
                key: 'requestTimeInterval',
                value: fiveMinutesInMs - 1,
            });

            testedAction({
                commit,
                state: store.state,
            });
            expect(store.state.requestTimeInterval).toBe(fiveMinutesInMs);
        });

        it('Setting up request timeout', async () => {
            action = 'setRequestTimeout';
            const mockedNotification = {
                id: '1',
                author: 'Jan kowalski',
                message: 'Super!!',
                avatar_id: 'abcde1234',
                read_at: null,
            };
            mockAxiosGetResult = {
                collection: [
                    mockedNotification,
                ],
                info: {
                    count: 1,
                },
            };

            await testedAction({
                commit,
                dispatch,
                state: store.state,
            });
            expect(store.state.requestTimeout).toBeTruthy();
            setTimeout(() => {
                expect(store.state.notifications.length).toBe(1);
                expect(store.state.notifications[0]).toStrictEqual(mockedNotification);
            }, store.state.requestTimeInterval);
        });
    });
});
