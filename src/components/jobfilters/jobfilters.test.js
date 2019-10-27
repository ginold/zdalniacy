import React from 'react';
import { shallow } from 'enzyme';
import Jobfilters from './jobfilters';

describe('<Jobfilters />', () => {
  test('renders', () => {
    const wrapper = shallow(<Jobfilters />);
    expect(wrapper).toMatchSnapshot();
  });
});
