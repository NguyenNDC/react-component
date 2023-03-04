import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import { CButton } from '..';
import { CModal } from './CModal';
import { CModalBody } from './CModalBody';
import { CModalFooter } from './CModalFooter';
import { CModalHeader } from './CModalHeader';
import { CModalTitle } from './CModalTitle';

export default {
  title: 'CModal',
  component: CModal,
} as ComponentMeta<typeof CModal>;

const Template: ComponentStory<typeof CModal> = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>Launch demo modal</CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>Woohoo, reading this text in a modal!</CModalBody>
        <CModalFooter className="flex justify-end">
          <CButton color="2nd" size="medium" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton className="ml-2" size="medium" color="1st">
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export const Modal = Template.bind({});
Modal.args = {};
