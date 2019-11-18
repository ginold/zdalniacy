import React from 'react';
import { shallow } from 'enzyme';
import ModalContentHomeworkExam from './modalContentHomeworkExam';

describe('<ModalContentHomeworkExam />', () => {
  test('renders', () => {
    const wrapper = shallow(<ModalContentHomeworkExam />);
    expect(wrapper).toMatchSnapshot();
  });
});
