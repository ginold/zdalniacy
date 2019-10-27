import React from 'react';
import { shallow } from 'enzyme';
import Footer_sidemenu from './footer_sidemenu';

describe('<Footer_sidemenu />', () => {
  test('renders', () => {
    const wrapper = shallow(<Footer_sidemenu />);
    expect(wrapper).toMatchSnapshot();
  });
});
