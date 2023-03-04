import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CDropdown } from './CDropdown';
import { CDropdownItem } from './CDropdownItem';
import { CDropdownMenu } from './CDropdownMenu';
import { CDropdownToggle } from './CDropdownToggle';

export default {
  title: 'CDropdown',
  component: CDropdown,
} as ComponentMeta<typeof CDropdown>;

const Template: ComponentStory<typeof CDropdown> = (args) => (
  <CDropdown {...args}>
    <CDropdownToggle color="3rd">button</CDropdownToggle>
    <CDropdownMenu>
      <CDropdownItem href="#">Action</CDropdownItem>
      <CDropdownItem href="#">Another action</CDropdownItem>
      <CDropdownItem href="#">Something else here</CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
);

export const Button = Template.bind({});
Button.args = { color: '1st', children: 'Button' };
