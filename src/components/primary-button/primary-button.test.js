import React from 'react';
import { shallow } from 'enzyme';
import PrimaryButton from './primary-button';

describe('<PrimaryButton />', () => {
  test('renders', () => {
    const wrapper = shallow(<PrimaryButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
