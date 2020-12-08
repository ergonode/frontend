/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="$t('attribute.extends.template.form.title')">
        <Autocomplete
            :data-cy="dataCyGenerator('default-label')"
            :value="defaultTextAttribute"
            :label="$t('attribute.extends.template.form.defaultLabel')"
            :searchable="true"
            :disabled="disabled"
            filter-type="TEXT"
            href="attributes/autocomplete"
            :error-messages="errors.defaultLabel"
            :additional-static-options="additionalStaticTextOptions"
            @input="setDefaultTextAttributeValue">
            <template #placeholder="{ isVisible }">
                <DropdownPlaceholder
                    v-if="isVisible"
                    :title="$t('attribute.extends.template.form.noLabelTitle')"
                    :subtitle="$t('attribute.extends.template.form.noLabelSubtitle')">
                    <template #action>
                        <Button
                            :title="$t('attribute.extends.template.form.noLabelButton')"
                            :size="smallSize"
                            :disabled="disabled"
                            @click.native="onNavigateToAttributes" />
                    </template>
                </DropdownPlaceholder>
            </template>
        </Autocomplete>
        <Autocomplete
            :data-cy="dataCyGenerator('default-image')"
            :value="defaultImageAttribute"
            :label="$t('attribute.extends.template.form.defaultImage')"
            :searchable="true"
            :clearable="true"
            :disabled="disabled"
            filter-type="IMAGE"
            :error-messages="errors.defaultImage"
            href="attributes/autocomplete"
            @input="setDefaultImageAttributeValue">
            <template #placeholder="{ isVisible }">
                <DropdownPlaceholder
                    v-if="isVisible"
                    :title="$t('attribute.extends.template.form.noImageTitle')"
                    :subtitle="$t('attribute.extends.template.form.noImageSubtitle')">
                    <template #action>
                        <Button
                            :title="$t('attribute.extends.template.form.noImageButton')"
                            :size="smallSize"
                            :disabled="disabled"
                            @click.native="onNavigateToAttributes" />
                    </template>
                </DropdownPlaceholder>
            </template>
        </Autocomplete>
    </FormSection>
</template>

<script>
import {
    ROUTE_NAME,
} from '@Attributes/config/routes';
import {
    SKU_MODEL,
} from '@Attributes/defaults/attributes';
import {
    SIZE,
} from '@Core/defaults/theme';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import Button from '@UI/components/Button/Button';
import FormSection from '@UI/components/Form/Section/FormSection';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateFormPresentation',
    components: {
        Button,
        DropdownPlaceholder,
        Autocomplete,
        FormSection,
    },
    mixins: [
        formFeedbackMixin,
    ],
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('productTemplate', [
            'defaultTextAttribute',
            'defaultImageAttribute',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        additionalStaticTextOptions() {
            return [
                SKU_MODEL,
            ];
        },
    },
    methods: {
        ...mapActions('productTemplate', [
            '__setState',
        ]),
        onNavigateToAttributes() {
            this.$router.push({
                name: ROUTE_NAME.ATTRIBUTES_GRID,
            });
        },
        setDefaultTextAttributeValue(value) {
            this.__setState({
                key: 'defaultTextAttribute',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'defaultTextAttribute',
                value,
            });
        },
        setDefaultImageAttributeValue(value) {
            this.__setState({
                key: 'defaultImageAttribute',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'defaultImageAttribute',
                value,
            });
        },
        dataCyGenerator(key) {
            return `template-${key}`;
        },
    },
};
</script>
