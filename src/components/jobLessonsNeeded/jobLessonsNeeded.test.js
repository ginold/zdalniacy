import React from 'react';
import { shallow } from 'enzyme';
import JobLessonsNeeded from './jobLessonsNeeded';

describe('<JobLessonsNeeded />', () => {
  test('renders', () => {
    const wrapper = shallow(<JobLessonsNeeded />);
    expect(wrapper).toMatchSnapshot();
  });
});
