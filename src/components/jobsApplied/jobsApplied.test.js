import React from 'react';
import { shallow } from 'enzyme';
import JobsApplied from './jobsApplied';

describe('<JobsApplied />', () => {
  test('renders', () => {
    const wrapper = shallow(<JobsApplied />);
    expect(wrapper).toMatchSnapshot();
  });
});
