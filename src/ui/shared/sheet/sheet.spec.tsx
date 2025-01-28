import { render } from '@testing-library/react';

import Sheet from '.';

describe('Sheet', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Sheet />);
		expect(baseElement).toBeTruthy();
	});
});
