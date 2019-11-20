import React from 'react';
import { shallow } from 'enzyme';
import SkipLink from './skipLink';

describe('<SkipLink />', () => {
  test('renders', () => {
    const wrapper = shallow(<SkipLink />);
    expect(wrapper).toMatchSnapshot();
  });
});
