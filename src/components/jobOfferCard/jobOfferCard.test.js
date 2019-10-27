import React from 'react';
import { shallow } from 'enzyme';
import JobOfferCard from './jobOfferCard';

describe('<JobOfferCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<JobOfferCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
