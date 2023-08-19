import React from "react"
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

import emojiList from "../emojiList.json";
import App from "../App";

describe("Emoji Search Test", ()=>{
    let emoji,input,header,filterList;
    beforeEach(() =>{
        render(<App/>);
    });
    test('header test', () => {
        header = screen.getByText(/Emoji Search/i);
        expect(header).toBeInTheDocument();
        const images = screen.getAllByRole("img");
        expect(images[0]);
        expect(images[1]);
    })
    test("emoji liste kontrolü",()=>{
        emoji = emojiList.slice(0,19);
        emoji.map((item) =>{
            expect(screen.getByText(item.title)).toBeInTheDocument();
        });
    })

    test("emoji listesi filtreleme ", () => {
        input = screen.getByRole("textbox"); 
        const filter = "smile cat";
        filterList = emojiList.filter(it => it.keywords.toLowerCase().match(filter) || it.title.toLowerCase().match(filter));
        fireEvent.change(input,{target:{value:filter}});
        expect(screen.getAllByText(/cat/i)).toHaveLength(2);
    });

    it("emoji tıklandığında kopyalama", 
    async () => {
        const click = screen.getByText("Joy");
        expect(click.parentElement.getAttribute("data-clipboard-text").length).toBeGreaterThan(0);
        console.log(click.parentElement.getAttribute("data-clipboard-text"));
        expect(click.parentElement.getAttribute("data-clipboard-text")).toMatch("😂");
    });
    
})