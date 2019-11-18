import React from 'react';
import { shallow } from 'enzyme';
import AccomplishedLessons from './accomplishedLessons';

describe('<AccomplishedLessons />', () => {
  test('renders', () => {
    const wrapper = shallow(<AccomplishedLessons />);
    expect(wrapper).toMatchSnapshot();
  });
});
