import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './spinner';

describe('<Spinner />', () => {
  test('renders', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).toMatchSnapshot();
  });
});
