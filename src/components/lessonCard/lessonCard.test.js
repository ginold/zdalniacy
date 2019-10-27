import React from 'react';
import { shallow } from 'enzyme';
import LessonCard from './lessonCard';

describe('<LessonCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<LessonCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
