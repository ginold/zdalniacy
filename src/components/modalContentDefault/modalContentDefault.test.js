import React from 'react';
import { shallow } from 'enzyme';
import ModalContentDefault from './modalContentDefault';

describe('<ModalContentDefault />', () => {
  test('renders', () => {
    const wrapper = shallow(<ModalContentDefault />);
    expect(wrapper).toMatchSnapshot();
  });
});
