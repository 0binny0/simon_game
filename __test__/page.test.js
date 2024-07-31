import {jest, test, beforeEach, spyOn} from "@jest/globals";
import userEvent from "@testing-library/user-event";
import {findByText, render, screen} from "@testing-library/react";
import {act} from 'react';
import Simon from "@/app/page.js";

test(
    `Verify that clicking <PowerToggleSwitch /> to turn the game on
    results in neutral sign being displayed to show the game is in fact on`, async () => {
        const user = userEvent.setup({delay: null});
        render(<Simon />);
        const power_on_button = screen.getByRole("button", {name: "power_on_button"});
        await user.click(power_on_button);
        const game_display_content = screen.getByText("- -");
        expect(game_display_content).toBeVisible();
    }
);

beforeEach(() => {
        jest.useFakeTimers();
})
test(
    `Verify that clicking the <NewGameButton /> will change the
        <GameDisplay /> to show level 1`, async () => {
            // https://stackoverflow.com/a/73908549/22863037
            const user = userEvent.setup({delay: null});
            render(<Simon />)
            const power_on_button = screen.getByRole("button", {name: "power_on_button"});
            await user.click(power_on_button);
            const new_game_button = screen.getByRole("button", {name: "start_new_game"});
            await user.click(new_game_button);
            await act(() => {
                jest.advanceTimersByTime(2400);
            });
            const display_screen_content = await screen.findByText("1");
            expect(display_screen_content).toBeVisible();
    }
);

// test(
//     `Verify that colors of a given sequence are automatically
//     shown to a user to match`, async () => {
//         const user = userEvent.setup({delay: null});
//         let mock_math_floor = jest.spyOn(Math, "floor");
//         mock_math_floor.mockReturnValue(0);
//         render(<Simon />)
//         const power_on_button = screen.getByRole("button", {name: "power_on_button"});
//         await user.click(power_on_button);
//         const new_game_button = screen.getByRole("button", {name: "start_new_game"});
//         await user.click(new_game_button);
//         await act(() => {
//             jest.advanceTimersByTime(3150);
//         });
//         const selected_pad = await screen.findByRole("button", {name: "red_pad"});
//         expect(selected_pad).toHaveClass("active_red");
//     }
// );

test(
    `Verify that a user sees a warning symbol when the wrong
    pad is chosen within a given color sequence`, async () => {
        const mock_math_floor = jest.spyOn(Math, "floor").mockReturnValue(2);
        const user = userEvent.setup({advanceTimers: jest.runAllTimers});
        render(<Simon />);
        screen.debug();
        const turn_game_on_button = screen.getByRole("button", {name: "power_on_button"});
        const start_new_game_button = screen.getByRole("button", {name: "start_new_game"});
        await act(async () => {
            await turn_game_on_button.click();
            await start_new_game_button.click();
        })
    }
);

afterEach(() => {
  jest.useRealTimers();
});