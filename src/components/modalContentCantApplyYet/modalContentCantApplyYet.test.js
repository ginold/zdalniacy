import React from 'react';
import { shallow } from 'enzyme';
import ModalContentCantApplyYet from './modalContentCantApplyYet';

describe('<ModalContentCantApplyYet />', () => {
  test('renders', () => {
    const wrapper = shallow(<ModalContentCantApplyYet />);
    expect(wrapper).toMatchSnapshot();
  });
});
