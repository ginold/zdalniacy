import React from 'react';
import { shallow } from 'enzyme';
import LandingPageUser from './landingPageUser';

describe('<LandingPageUser />', () => {
  test('renders', () => {
    const wrapper = shallow(<LandingPageUser />);
    expect(wrapper).toMatchSnapshot();
  });
});
