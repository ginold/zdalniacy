import React from 'react';
import { shallow } from 'enzyme';
import SavedLessons from './savedLessons';

describe('<SavedLessons />', () => {
  test('renders', () => {
    const wrapper = shallow(<SavedLessons />);
    expect(wrapper).toMatchSnapshot();
  });
});
