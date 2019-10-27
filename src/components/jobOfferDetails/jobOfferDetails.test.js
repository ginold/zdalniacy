import React from 'react';
import { shallow } from 'enzyme';
import JobOfferDetails from './jobOfferDetails';

describe('<JobOfferDetails />', () => {
  test('renders', () => {
    const wrapper = shallow(<JobOfferDetails />);
    expect(wrapper).toMatchSnapshot();
  });
});
