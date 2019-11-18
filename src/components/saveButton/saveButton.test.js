import React from 'react';
import { shallow } from 'enzyme';
import SaveButton from './saveButton';

describe('<SaveButton />', () => {
  test('renders', () => {
    const wrapper = shallow(<SaveButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
