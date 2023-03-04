import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { CFormInput } from '../CFormInput';

const meta: Meta<typeof CFormInput> = {
  title: 'form/CFormInput',
  component: CFormInput,
};

export default meta;
type Story = StoryObj<typeof CFormInput>;

export const FormInput: Story = {
  render: (arg) => {
    return (
      <div className="w-[450px]">
        <CFormInput label="Input" placeholder="input" size="small" {...arg} />
      </div>
    );
  },
};
