import React from 'react';
import { shallow } from 'enzyme';
import MessagesButton from './messages-button';

describe('<MessagesButton />', () => {
  test('renders', () => {
    const wrapper = shallow(<MessagesButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
