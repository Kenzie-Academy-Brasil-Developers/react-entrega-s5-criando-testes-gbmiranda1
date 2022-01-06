import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Search from "../../components/Search";
import Providers from "../../providers"
import api from "../../services"
import MockAdapter from "axios-mock-adapter";

const apiMock = new MockAdapter(api);


describe("Search Page/Component", () => {
	test("should be able to search", async () => {
        apiMock.onPost("/cep").replyOnce(200, {});

		render(
            <Providers>
                <Search/>
            </Providers>
        );
		
		const buttonElement = screen.getByRole("button");
		const cep = screen.getByPlaceholderText("Insira o CEP");
        
		fireEvent.change(cep, { target: { value: 66020090 }})
		fireEvent.click(buttonElement)

        await waitFor(() =>{
            expect(cep).toHaveValue(66020090)
        })


	})
    test("should be able to invalid search", async () => {
        apiMock.onPost("/cep").replyOnce(200, {});

		render(
            <Providers>
                <Search/>
            </Providers>
        );

        const buttonElement = screen.getByRole("button");	
		const cepText = screen.getByPlaceholderText("Insira o CEP");
        
		fireEvent.change(cepText, { target: { value: 99999998 }})
        fireEvent.click(buttonElement)
		
        await waitFor(() =>{
            expect(screen.queryByPlaceholderText("Logradouro")).not.toBeInTheDocument()
        })


	})
})
     