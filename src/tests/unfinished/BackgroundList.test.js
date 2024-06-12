import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import BackgroundList from '../../components/Meditation/Background/BackgroundList';
import { CloudinaryContext } from '../../context/CloudinaryContext';
import { useAuthContext } from '../../hooks/useAuthContext';

jest.mock('axios');
jest.mock('../../hooks/useAuthContext');

describe('BackgroundList', () => {
  beforeEach(() => {
    useAuthContext.mockReturnValue({
      user: {
        user: {
          _id: 'user_id',
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders grid with images', async () => {
    const mockImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const mockUserImages = ['userImage1.jpg', 'userImage2.jpg'];
    const mockDispatch = jest.fn();

    axios.get.mockResolvedValueOnce({ data: mockImages });
    axios.get.mockResolvedValueOnce({ data: { uploadedBackgrounds: mockUserImages } });

    render(
      <CloudinaryContext.Provider value={{ images: [], dispatch: mockDispatch, displayedImage: null }}>
        <BackgroundList />
      </CloudinaryContext.Provider>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'GET_IMAGES', payload: mockImages });
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'GET_USER_IMAGES', payload: mockUserImages });
    });

    const imageElements = screen.getAllByRole('img');
    expect(imageElements).toHaveLength(mockImages.length);
  });

  // Add more tests for other scenarios
});