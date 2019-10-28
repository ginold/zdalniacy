import React from 'react';
import { shallow } from 'enzyme';
import AccessibilityFab from './accessibility-fab';

describe('<AccessibilityFab />', () => {
  test('renders', () => {
    const wrapper = shallow(<AccessibilityFab />);
    expect(wrapper).toMatchSnapshot();
  });
});
