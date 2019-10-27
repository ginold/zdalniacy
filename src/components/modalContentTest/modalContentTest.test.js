import React from 'react';
import { shallow } from 'enzyme';
import ModalContentTest from './modalContentTest';

describe('<ModalContentTest />', () => {
  test('renders', () => {
    const wrapper = shallow(<ModalContentTest />);
    expect(wrapper).toMatchSnapshot();
  });
});
