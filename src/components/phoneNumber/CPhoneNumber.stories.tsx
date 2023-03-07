import type { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import React from 'react';

import { CPhoneNumber } from './CPhoneNumber';

export default {
  title: 'CPhoneNumber',
  component: CPhoneNumber,
} as ComponentMeta<typeof CPhoneNumber>;

const Template: ComponentStoryFn<typeof CPhoneNumber> = (arg) => (
  <div className="w-[450px]">
    <CPhoneNumber {...arg} />
  </div>
);
export const PhoneNumber = Template.bind({});
PhoneNumber.args = { defaultCountry: 'VI' };
