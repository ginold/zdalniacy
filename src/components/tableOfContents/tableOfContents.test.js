import React from 'react';
import { shallow } from 'enzyme';
import TableOfContents from './tableOfContents';

describe('<TableOfContents />', () => {
  test('renders', () => {
    const wrapper = shallow(<TableOfContents />);
    expect(wrapper).toMatchSnapshot();
  });
});
