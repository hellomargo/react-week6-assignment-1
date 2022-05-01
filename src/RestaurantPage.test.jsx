import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';
import given from 'given2';
import RestaurantPage from './RestaurantPage';

import RESTAURANT from '../fixtures/restaurant';

describe('RetaurantPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    given('restaurant', () => RESTAURANT);
    given('loading', () => false);
  });

  const renderRestaurantPage = () => render((
    <MemoryRouter>
      <RestaurantPage />
    </MemoryRouter>
  ));

  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    restaurant: {
      data: given.restaurant,
      loading: given.loading,
      error: null,
    },
  }));

  context('when load restaurant', () => {
    given('loading', () => true);
    given('restaurant', () => ({}));

    it('renders "loading..."', () => {
      const { container } = renderRestaurantPage();

      expect(container).toHaveTextContent('loading...');
    });
  });

  context('without restaurant data', () => {
    given('loading', () => false);
    given('restaurant', () => undefined);

    it('renders "loading..."', () => {
      const { container } = renderRestaurantPage();

      expect(container).toHaveTextContent('loading...');
    });
  });

  context('with restaurant', () => {
    given('loading', () => false);
    given('restaurant', () => RESTAURANT);

    it('renders restaurant name', () => {
      const { container } = renderRestaurantPage();

      expect(container).toHaveTextContent('성전떡볶이');
    });

    it('renders restaurant address', () => {
      const { container } = renderRestaurantPage();

      expect(container).toHaveTextContent('주소: 서울 강남구 강남대로94길 21');
    });

    it('renders menu', () => {
      const { container } = renderRestaurantPage();

      expect(container).toHaveTextContent('메뉴');

      ['떡볶이', '튀김', '오뎅', '컵밥'].forEach((menu) => (
        expect(container).toHaveTextContent(menu)
      ));
    });
  });
});
