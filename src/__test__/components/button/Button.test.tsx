import React from "react";
import {render, screen} from "@testing-library/react"
import Search from "../../../components/Search";

describe("button component", ()=>{
    test("should be able to render an button", ()=> {
        render(<Search />);

        expect(screen.getByRole("button")).toBeTruthy();
    })
})