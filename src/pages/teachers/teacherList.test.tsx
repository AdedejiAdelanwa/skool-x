/**
 * @jest-environment jsdom
 */

import React from 'react';
import { RenderResult, act, render, waitFor } from '@testing-library/react';
import TeachersTable from './teachersTable';
import { fetchTeachers } from '@/utils/api';

jest.mock('../../utils/api', () => ({
    
    fetchTeachers: jest.fn().mockResolvedValue([
      {
        id: 1,
        firstname: 'John',
        surname: 'Doe',
        dateOfBirth: '2001-01-01',
        teacherNumber: 'skx001',
        nationalId: '1234567890',
        salary: 30000
      },
    ]),
  }));

  describe('TeachersTable', () => {
    it('renders the table with teacher data', async () => {
      let screen: RenderResult;
  
      await act(async () => {
          // Render the component
          screen = render(<TeachersTable />);
      });
  
      // Wait for the component to fetch and display the data
      await waitFor(() => expect(fetchTeachers).toHaveBeenCalled());
  
      // Assert that the teacher data is rendered in the table
      expect(screen!.getByText('John Doe')).toBeTruthy();
      expect(screen!.getByText('skx001')).toBeTruthy();
      expect(screen!.getByText('1234567890')).toBeTruthy();
      expect(screen!.getByText(30000)).toBeTruthy();
      
    });
  
    // Add more test cases as needed
  });