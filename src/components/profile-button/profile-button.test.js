import React from 'react';
import { shallow } from 'enzyme';
import ProfileButton from './profile-button';

describe('<ProfileButton />', () => {
  test('renders', () => {
    const wrapper = shallow(<ProfileButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
