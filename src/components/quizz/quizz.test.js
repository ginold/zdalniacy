import React from 'react';
import { shallow } from 'enzyme';
import Quizz from './quizz';

describe('<Quizz />', () => {
  test('renders', () => {
    const wrapper = shallow(<Quizz />);
    expect(wrapper).toMatchSnapshot();
  });
});
