/**
 * @jest-environment jsdom
 */

import React from 'react';
import { RenderResult, act, render, waitFor } from '@testing-library/react';
import StudentsTable from './studentsTable';
import { fetchStudents } from '../../utils/api'; 

jest.mock('../../utils/api', () => ({
    
  fetchStudents: jest.fn().mockResolvedValue([
    {
      id: 1,
      firstname: 'John',
      surname: 'Doe',
      dateOfBirth: '2000-01-01',
      studentNumber: 'skx001',
      nationalId: '1234567890',
    },
  ]),
}));

describe('StudentsTable', () => {
  it('renders the table with student data', async () => {
    let screen: RenderResult;

    await act(async () => {
        // Render the component
        screen = render(<StudentsTable />);
    });

    // Wait for the component to fetch and display the data
    await waitFor(() => expect(fetchStudents).toHaveBeenCalled());

    // Assert that the student data is rendered in the table
    expect(screen!.getByText('John Doe')).toBeTruthy();
    expect(screen!.getByText('2000-01-01')).toBeTruthy();
    expect(screen!.getByText('skx001')).toBeTruthy();
    expect(screen!.getByText('1234567890')).toBeTruthy();
  });


});