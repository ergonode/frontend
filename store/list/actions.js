/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { getMappedFilters } from '~/model/mappers/gridDataMapper';
import { UNASSIGNED_GROUP_ID } from '~/defaults/list';
import { FILTER_OPERATOR } from '~/defaults/operators';
import { getUUID } from '~/model/stringWrapper';
import { getMappedGroupsElementsCount } from '~/model/mappers/attributeMapper';

export default {
    getElements({ commit, state }, { listType, languageCode }) {
        const path = `${languageCode}/${listType}`;
        const params = {
            limit: 9999,
            offset: 0,
            filter: state.filter.length ? `code=${state.filter}` : null,
            field: 'code',
            order: 'ASC',
        };

        return this.app.$axios.$get(path, { params }).then(({ collection }) => {
            commit(types.SET_ELEMENTS_FOR_LANGUAGE, { languageCode, elements: collection });
            if (listType === 'attributes') {
                commit(types.SET_GROUPS_ELEMENTS_COUNT, getMappedGroupsElementsCount(collection));
            }
        });
    },
    getGroups({ commit }, languageCode) {
        const groupsPath = `${languageCode}/attributes/groups`;

        return this.app.$axios.$get(groupsPath).then(({ collection }) => {
            const groupsElementsCount = {};
            const groups = [];

            const { length } = collection;

            for (let i = 0; i < length; i += 1) {
                // eslint-disable-next-line camelcase
                const {
                    id, code, name, elements_count: elementsCount,
                } = collection[i];
                groups.push({
                    id,
                    key: code,
                    value: name || `#${code}`,
                });
                groupsElementsCount[id] = elementsCount;
            }

            groups.push({
                id: UNASSIGNED_GROUP_ID,
                key: getUUID(),
                value: 'Not Assigned',
            });
            groupsElementsCount[UNASSIGNED_GROUP_ID] = 0;

            commit(types.SET_GROUPS_ELEMENTS_COUNT, groupsElementsCount);
            commit(types.SET_GROUPS_FOR_LANGUAGE, {
                languageCode,
                groups,
            });
        });
    },
    getElementsForGroup({ commit, state }, {
        listType, groupId, languageCode,
    }) {
        const path = `${languageCode}/${listType}`;
        const groupFilter = groupId ? getMappedFilters({ groups: { value: groupId, operator: FILTER_OPERATOR.EQUAL } }) : 'groups=';
        const params = {
            limit: 9999,
            offset: 0,
            filter: state.filter ? `${groupFilter};code=${state.filter}` : groupFilter,
            field: 'code',
            order: 'ASC',
        };

        return this.app.$axios.$get(path, { params }).then(({ collection }) => {
            commit(types.SET_ELEMENTS_FOR_LANGUAGE, { languageCode, elements: collection });

            if (groupId === UNASSIGNED_GROUP_ID) {
                commit(types.SET_GROUPS_ELEMENTS_COUNT_FOR_UNASSIGNED_ELEMENTS,
                    getMappedGroupsElementsCount(collection)[UNASSIGNED_GROUP_ID]);
            }
        });
    },
    setFilter({ commit }, filter) {
        commit(types.SET_FILTER, filter);
    },
    setElementsForLanguage: ({ commit, rootState }, elements) => {
        const { language: languageCode } = rootState.authentication.user;
        commit(types.SET_ELEMENTS_FOR_LANGUAGE, { languageCode, elements });
    },
    setDisabledElement: ({ commit }, payload) => {
        commit(types.SET_DISABLED_ELEMENT, payload);
    },
    setDisabledElements: ({ commit }, elements) => {
        elements.forEach((element) => {
            commit(types.SET_DISABLED_ELEMENT, element);
        });
    },
    removeDisabledElement: ({ commit }, payload) => {
        commit(types.REMOVE_DISABLED_ELEMENT, payload);
    },
    clearStorage: ({ commit }) => commit(types.CLEAR_STATE),
};
