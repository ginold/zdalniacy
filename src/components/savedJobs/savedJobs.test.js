import React from 'react';
import { shallow } from 'enzyme';
import SavedJobs from './savedJobs';

describe('<SavedJobs />', () => {
  test('renders', () => {
    const wrapper = shallow(<SavedJobs />);
    expect(wrapper).toMatchSnapshot();
  });
});
