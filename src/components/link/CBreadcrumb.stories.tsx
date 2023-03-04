// Button.stories.ts|tsx

import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CLink } from './CLink';

export default {
  title: 'CLink',
  component: CLink,
} as ComponentMeta<typeof CLink>;

export const Link: ComponentStory<typeof CLink> = () => <CLink>link</CLink>;
Link.storyName = 'Link';
