import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { CFormTextarea } from '../CFormTextarea';

const meta: Meta<typeof CFormTextarea> = {
  title: 'form/CFormTextarea',
  component: CFormTextarea,
};

export default meta;
type Story = StoryObj<typeof CFormTextarea>;

export const FormTextarea: Story = {
  render: (arg) => {
    return (
      <CFormTextarea
        label="TextArea"
        className="w-[450px]"
        placeholder="Text area"
        {...arg}
      />
    );
  },
};
