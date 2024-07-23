import {jest, test, beforeEach} from "@jest/globals";
import userEvent from "@testing-library/user-event";
import {findByText, render, screen} from "@testing-library/react";
import {act} from "react";
import Simon from "@/app/page.js";

test(
    `Verify that clicking <PowerToggleSwitch /> to turn the game on
    results in neutral sign being displayed to show the game is in fact on`, async () => {
        const user = userEvent.setup();
        render(<Simon />);
        const power_on_button = screen.getByRole("button", {name: "power_on_button"});
        await user.click(power_on_button);
        const game_display_content = screen.getByText("- -");
        expect(game_display_content).toBeVisible();
    }
);