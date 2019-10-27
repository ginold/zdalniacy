import React from 'react';
import { shallow } from 'enzyme';
import Settings from './settings';

describe('<Settings />', () => {
  test('renders', () => {
    const wrapper = shallow(<Settings />);
    expect(wrapper).toMatchSnapshot();
  });
});
