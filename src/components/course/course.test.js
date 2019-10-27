import React from 'react';
import { shallow } from 'enzyme';
import Course from './course';

describe('<Course />', () => {
  test('renders', () => {
    const wrapper = shallow(<Course />);
    expect(wrapper).toMatchSnapshot();
  });
});
