import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { CFormMultiSelect } from '../select';

const meta: Meta<typeof CFormMultiSelect> = {
  title: 'form/CFormMultiSelect',
  component: CFormMultiSelect,
};

export default meta;
type Story = StoryObj<typeof CFormMultiSelect>;

export const FormMultiSelect: Story = {
  render: (arg) => {
    const options = [
      { label: 'demo1', value: 'demo1' },
      { label: 'demo2', value: 'demo2' },
      { label: 'demo3', value: 'demo3' },
      { label: 'demo4', value: 'demo4' },
    ];
    return (
      <div className="w-[450px]">
        <CFormMultiSelect
          label="Multi Select"
          options={options}
          placeholder="input"
          {...arg}
        />
      </div>
    );
  },
};
