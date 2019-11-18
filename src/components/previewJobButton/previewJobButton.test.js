import React from 'react';
import { shallow } from 'enzyme';
import PreviewJobButton from './previewJobButton';

describe('<PreviewJobButton />', () => {
  test('renders', () => {
    const wrapper = shallow(<PreviewJobButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
