import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
// Component
import CohortList from '../components/CohortList/CohortList';

describe('CohortList', () => {
	it('renders correctly', () => {
		const tree = renderer.create(<CohortList />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
