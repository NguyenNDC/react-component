import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CToast } from './CToast';
import { CToastBody } from './CToastBody';
import { CToastHeader } from './CToastHeader';

export default {
  title: 'CToast',
  component: CToast,
} as ComponentMeta<typeof CToast>;

const Template: ComponentStory<typeof CToast> = (args) => (
  <CToast animation={false} autohide={false} visible={true} {...args}>
    <CToastHeader>
      <div>Ichiba</div>
    </CToastHeader>
    <CToastBody>Hello world! This is Ichiba.</CToastBody>
  </CToast>
);

export const Toast = Template.bind({});
Toast.args = { color: 'success' };
