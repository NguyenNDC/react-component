import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { CFormSelect } from '../select';

const meta: Meta<typeof CFormSelect> = {
  title: 'form/CFormSelect',
  component: CFormSelect,
};

export default meta;
type Story = StoryObj<typeof CFormSelect>;

export const FormSelect: Story = {
  render: (arg) => {
    const options = [
      { label: 'demo1', value: 'demo1' },
      { label: 'demo2', value: 'demo2' },
      { label: 'demo3', value: 'demo3' },
      { label: 'demo4', value: 'demo4' },
    ];
    return (
      <div className="w-[450px]">
        <CFormSelect
          label="Select"
          options={options}
          placeholder="input"
          {...arg}
        />
      </div>
    );
  },
};
