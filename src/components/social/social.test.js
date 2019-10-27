import React from 'react';
import { shallow } from 'enzyme';
import Social from './social';

describe('<Social />', () => {
  test('renders', () => {
    const wrapper = shallow(<Social />);
    expect(wrapper).toMatchSnapshot();
  });
});
