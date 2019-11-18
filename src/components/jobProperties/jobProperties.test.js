import React from 'react';
import { shallow } from 'enzyme';
import JobProperties from './jobProperties';

describe('<JobProperties />', () => {
  test('renders', () => {
    const wrapper = shallow(<JobProperties />);
    expect(wrapper).toMatchSnapshot();
  });
});
