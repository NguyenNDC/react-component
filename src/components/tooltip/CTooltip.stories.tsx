import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { CTooltip } from './CTooltip';

const meta: Meta<typeof CTooltip> = {
  title: 'CTooltip',
  component: CTooltip,
};

export default meta;
type Story = StoryObj<typeof CTooltip>;

export const Tooltip: Story = {
  render: (arg) => (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="inline-block">
        <CTooltip placement="bottom" {...arg} content=" Wikipedia">
          <p>tooltip</p>
        </CTooltip>
      </div>
    </div>
  ),
};
