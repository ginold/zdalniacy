import React from 'react';
import { shallow } from 'enzyme';
import Modal from './modal';

describe('<Modal />', () => {
  test('renders', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper).toMatchSnapshot();
  });
});
