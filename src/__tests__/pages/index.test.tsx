/* eslint-disable @typescript-eslint/require-await */
import { render } from '@testing-library/react';

import devData from '@/data/dev-data.json';

import IntroSection from '@/components/home/IntroSection';
import Layout from '@/components/layout/Layout';

import HomePage from '@/pages';

describe('Index Page', () => {
  it('renders The Layout', async () => {
    const { container } = render(
      <Layout>
        <p>Hello world</p>
      </Layout>,
    );
    expect(container.firstChild?.hasChildNodes()).toBeTruthy();
  });

  test('render the intro section showing a png with next/image', async () => {
    const { container } = render(<IntroSection data={devData} />);
    expect(container.firstChild?.hasChildNodes()).toBeTruthy();
  });
});

describe('Index Page', () => {
  it('renders index page', async () => {
    const { container } = render(<HomePage />);
    expect(container.firstChild?.hasChildNodes()).toBeTruthy();
  });
});
