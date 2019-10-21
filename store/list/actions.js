/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { getMappedFilters, getMappedElementsToGroups } from '~/model/mappers/gridDataMapper';
import { UNASSIGNED_GROUP_ID } from '~/defaults/list/main';

export default {
    getFilteredGroupElements({ commit, state }, { listType, languageCode }) {
        const path = `${languageCode}/${listType}`;
        const params = {
            filter: `code=${state.filter}`,
        };

        return this.app.$axios.$get(path, { params }).then(({ collection: elements }) => {
            const { groupElementsCount } = state;
            const { unassignedElements, groupedElements } = getMappedElementsToGroups(elements);

            if (groupElementsCount[UNASSIGNED_GROUP_ID] !== unassignedElements.length) {
                commit(types.SET_GROUP_ELEMENTS_COUNT,
                    { groupId: UNASSIGNED_GROUP_ID, elementsCount: unassignedElements.length });
            }

            Object.keys(groupedElements).forEach((key) => {
                if (groupElementsCount[key] !== groupedElements[key].length) {
                    commit(types.SET_GROUP_ELEMENTS_COUNT,
                        { groupId: key, elementsCount: groupedElements[key].length });
                }
            });

            commit(types.SET_ELEMENTS_FOR_LANGUAGE, { languageCode, elements });
        });
    },
    getGroups({ commit, state }, {
        languageCode,
    }) {
        const { groupElementsCount } = state;
        const groupsPath = `${languageCode}/attributes/groups`;

        return this.app.$axios.$get(groupsPath).then(({ collection: groups }) => {
            commit(types.SET_GROUPS_FOR_LANGUAGE, {
                languageCode,
                groups: groups.map(({ id, label }) => ({
                    id: id || UNASSIGNED_GROUP_ID, label,
                })),
            });

            groups.forEach((group) => {
                if (groupElementsCount[group.id] !== group.elements_count) {
                    commit(types.SET_GROUP_ELEMENTS_COUNT, {
                        groupId: group.id || UNASSIGNED_GROUP_ID,
                        elementsCount: group.elements_count,
                    });
                }
            });
        });
    },
    getElementsForGroup({ commit, state }, {
        listType, groupId, elementsCount, languageCode,
    }) {
        const { elements: stateElements } = state;
        const path = `${languageCode}/${listType}`;
        const groupFilter = groupId !== UNASSIGNED_GROUP_ID ? getMappedFilters({ groups: groupId }) : 'groups=';
        const params = {
            limit: elementsCount,
            offset: 0,
            filter: state.filter ? `${groupFilter};code=${state.filter}` : groupFilter,
        };

        return this.app.$axios.$get(path, { params }).then(({ collection: elements }) => {
            if (!stateElements[languageCode]) {
                commit(types.INITIALIZE_ELEMENTS_FOR_LANGUAGE, { languageCode });
                commit(types.SET_ELEMENTS_FOR_LANGUAGE, { languageCode, elements });
            } else {
                const elementsToAdd = elements.filter(
                    (element) => !stateElements[languageCode].some(
                        (stateElement) => stateElement.id === element.id,
                    ),
                );

                commit(types.ADD_ELEMENTS_FOR_LANGUAGE, { languageCode, elements: elementsToAdd });
            }
        });
    },
    getElements({ commit, state }, { listType, languageCode }) {
        const path = `${languageCode}/${listType}`;
        const params = {
            field: 'code',
            order: 'ASC',
        };
        if (state.filter) {
            params.filter = `code=${state.filter}`;
        }

        return this.app.$axios.$get(path, { params }).then(({ collection: elements }) => {
            commit(types.SET_ELEMENTS_FOR_LANGUAGE, { languageCode, elements });
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
