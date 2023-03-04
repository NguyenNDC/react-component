// Button.stories.ts|tsx

import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CBreadcrumb } from './CBreadcrumb';
import { CBreadcrumbItem } from './CBreadcrumbItem';

export default {
  title: 'CBreadcrumb',
  component: CBreadcrumb,
} as ComponentMeta<typeof CBreadcrumb>;

export const Breadcrumb: ComponentStory<typeof CBreadcrumb> = () => (
  <CBreadcrumb>
    <CBreadcrumbItem>Home</CBreadcrumbItem>
    <CBreadcrumbItem>user</CBreadcrumbItem>
    <CBreadcrumbItem active>profile</CBreadcrumbItem>
  </CBreadcrumb>
);
Breadcrumb.storyName = 'Breadcrumb';
