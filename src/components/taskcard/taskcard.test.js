import React from 'react';
import { shallow } from 'enzyme';
import Taskcard from './taskcard';

describe('<Taskcard />', () => {
  test('renders', () => {
    const wrapper = shallow(<Taskcard />);
    expect(wrapper).toMatchSnapshot();
  });
});
