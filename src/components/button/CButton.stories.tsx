import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CButton } from './CButton';

export default {
  title: 'CButton',
  component: CButton,
} as ComponentMeta<typeof CButton>;

const Template: ComponentStory<typeof CButton> = (args) => (
  <CButton {...args} />
);

export const Button = Template.bind({});
Button.args = { color: '1st', children: 'Button' };
