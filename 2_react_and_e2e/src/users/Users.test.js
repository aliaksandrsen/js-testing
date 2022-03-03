import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

import Users from './Users';
import UsersDetailsPage from '../pages/UsersDetailsPage';

jest.mock('axios');

describe('USERS TEST', () => {
  let response;

  beforeEach(() => {
    response = {
      data: [
        {
          id: 1,
          name: 'Leanne Graham',
        },
        {
          id: 2,
          name: 'Ervin Howell',
        },
        {
          id: 3,
          name: 'Clementine Bauch',
        },
      ],
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders learn react link', async () => {
    axios.get.mockReturnValue(response);
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );
    const users = await screen.findAllByTestId('user-item');
    expect(users.length).toBe(3);
    expect(axios.get).toBeCalledTimes(1);
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
  });

  test('redirect to details page', async () => {
    axios.get.mockReturnValue(response);
    render(
      <MemoryRouter initialEntries={['/users']}>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UsersDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
    const users = await screen.findAllByTestId('user-item');
    userEvent.click(users[0]);
    expect(screen.getByTestId('user-page')).toBeInTheDocument();
  });
});
