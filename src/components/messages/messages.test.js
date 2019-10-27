import React from 'react';
import { shallow } from 'enzyme';
import Messages from './messages';

describe('<Messages />', () => {
  test('renders', () => {
    const wrapper = shallow(<Messages />);
    expect(wrapper).toMatchSnapshot();
  });
});
