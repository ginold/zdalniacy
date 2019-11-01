import React from 'react';
import { shallow } from 'enzyme';
import LessonTabs from './lessonTabs';

describe('<LessonTabs />', () => {
  test('renders', () => {
    const wrapper = shallow(<LessonTabs />);
    expect(wrapper).toMatchSnapshot();
  });
});
