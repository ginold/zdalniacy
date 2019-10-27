import React from 'react';
import { shallow } from 'enzyme';
import EducationCard from './educationCard';

describe('<EducationCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<EducationCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
