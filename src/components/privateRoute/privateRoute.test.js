import React from 'react';
import { shallow } from 'enzyme';
import PrivateRoute from './privateRoute';

describe('<PrivateRoute />', () => {
  test('renders', () => {
    const wrapper = shallow(<PrivateRoute />);
    expect(wrapper).toMatchSnapshot();
  });
});
