import React from 'react';
import { shallow } from 'enzyme';
import ModalContentApply from './modalContentApply';

describe('<ModalContentApply />', () => {
  test('renders', () => {
    const wrapper = shallow(<ModalContentApply />);
    expect(wrapper).toMatchSnapshot();
  });
});
