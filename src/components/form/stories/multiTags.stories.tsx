import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { CFormMultiTags } from '../CFormMultiTags';

const meta: Meta<typeof CFormMultiTags> = {
  title: 'form/CFormMultiTags',
  component: CFormMultiTags,
};

export default meta;
type Story = StoryObj<typeof CFormMultiTags>;

export const FormMultiTags: Story = {
  render: (arg) => {
    return (
      <div className="w-[450px]">
        <CFormMultiTags label="MultiTags" placeholder="Multi tags" {...arg} />
      </div>
    );
  },
};
