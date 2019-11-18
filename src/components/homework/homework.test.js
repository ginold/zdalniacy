import React from 'react';
import { shallow } from 'enzyme';
import Homework from './homework';

describe('<Homework />', () => {
  test('renders', () => {
    const wrapper = shallow(<Homework />);
    expect(wrapper).toMatchSnapshot();
  });
});
