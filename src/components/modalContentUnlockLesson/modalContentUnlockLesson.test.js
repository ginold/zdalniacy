import React from 'react';
import { shallow } from 'enzyme';
import ModalContentUnlockLesson from './modalContentUnlockLesson';

describe('<ModalContentUnlockLesson />', () => {
  test('renders', () => {
    const wrapper = shallow(<ModalContentUnlockLesson />);
    expect(wrapper).toMatchSnapshot();
  });
});
