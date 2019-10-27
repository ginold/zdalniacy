import React from 'react';
import { shallow } from 'enzyme';
import Education from './education';

describe('<Education />', () => {
  test('renders', () => {
    const wrapper = shallow(<Education />);
    expect(wrapper).toMatchSnapshot();
  });
});
