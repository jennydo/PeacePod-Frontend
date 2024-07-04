import { BrowserRouter } from 'react-router-dom';
import { NavCards } from '../../components/Home/NavCards';
import { render, screen, fireEvent } from '@testing-library/react';

describe('NavCards in HomePage', () => {
    it('navigate to Newsfeed when click on Newsfeed cloud', () => {
        const {history} = render(
            <BrowserRouter>
              <NavCards/>
            </BrowserRouter>
        );
        const newsfeedBtn = screen.getByTestId('button-card-NewsFeed');
        fireEvent.click(newsfeedBtn); 
        setTimeout(() => {
            expect(history.location.pathname).toBe('/newsfeed');
        });
    });

    it('navigate to Anonymous Chat when click on Anonymous Chat cloud', () => {
        const {history} = render(
            <BrowserRouter>
              <NavCards/>
            </BrowserRouter>
        );
        const chatBtn = screen.getByTestId('button-card-Anonymous Chat');
        fireEvent.click(chatBtn); 
        setTimeout(() => {
            expect(history.location.pathname).toBe('/chat');
        });
    });

    it('navigate to Meditation when click on Meditation cloud', () => {
        const {history} = render(
            <BrowserRouter>
              <NavCards/>
            </BrowserRouter>
        );
        const meditationBtn = screen.getByTestId('button-card-Meditation');
        fireEvent.click(meditationBtn); 
        setTimeout(() => {
            expect(history.location.pathname).toBe('/meditation');
        });
    });
});