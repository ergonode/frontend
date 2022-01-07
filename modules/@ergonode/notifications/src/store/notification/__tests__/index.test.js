/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from '@Notifications/config/imports';
import {
    ACTION_CENTER_SECTIONS,
    MAX_NOTIFICATIONS_INTERVAL,
} from '@Notifications/defaults';
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
        $getExtendSlot: () => ({}),
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
            const createdAt = new Date();
            const mockedNotification = {
                id: '1',
                object_id: '123',
                author: 'Jan kowalski',
                message: 'Super!!',
                created_at: createdAt,
                avatar_id: 'abcde1234',
                read_at: null,
                type: 'simple',
            };
            const mockedResultNotification = {
                id: '1',
                author: 'Jan kowalski',
                message: 'Super!!',
                avatar_id: 'abcde1234',
                readAt: null,
                createdAt,
                objectId: '123',
                component: Components.NotificationListItem,
                section: ACTION_CENTER_SECTIONS.NOTIFICATIONS,
            };

            action = 'getNotifications';
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
            expect(store.state.notifications[0]).toStrictEqual(mockedResultNotification);
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

            commit('__SET_STATE', {
                key: 'requestTimeInterval',
                value: MAX_NOTIFICATIONS_INTERVAL,
            });

            testedAction({
                commit,
                state: store.state,
            });
            expect(store.state.requestTimeInterval).toBe(MAX_NOTIFICATIONS_INTERVAL);

            commit('__SET_STATE', {
                key: 'requestTimeInterval',
                value: MAX_NOTIFICATIONS_INTERVAL - 1,
            });

            testedAction({
                commit,
                state: store.state,
            });
            expect(store.state.requestTimeInterval).toBe(MAX_NOTIFICATIONS_INTERVAL);
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
