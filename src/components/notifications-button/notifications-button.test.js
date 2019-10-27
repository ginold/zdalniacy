import React from 'react';
import { shallow } from 'enzyme';
import NotificationsButton from './notifications-button';

describe('<NotificationsButton />', () => {
  test('renders', () => {
    const wrapper = shallow(<NotificationsButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
