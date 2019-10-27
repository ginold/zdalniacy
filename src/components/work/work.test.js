import React from 'react';
import { shallow } from 'enzyme';
import Work from './work';

describe('<Work />', () => {
  test('renders', () => {
    const wrapper = shallow(<Work />);
    expect(wrapper).toMatchSnapshot();
  });
});
