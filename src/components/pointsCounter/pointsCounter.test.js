import React from 'react';
import { shallow } from 'enzyme';
import PointsCounter from './pointsCounter';

describe('<PointsCounter />', () => {
  test('renders', () => {
    const wrapper = shallow(<PointsCounter />);
    expect(wrapper).toMatchSnapshot();
  });
});
