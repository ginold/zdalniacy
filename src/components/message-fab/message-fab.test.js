import React from 'react';
import { shallow } from 'enzyme';
import MessageFab from './message-fab';

describe('<MessageFab />', () => {
  test('renders', () => {
    const wrapper = shallow(<MessageFab />);
    expect(wrapper).toMatchSnapshot();
  });
});
