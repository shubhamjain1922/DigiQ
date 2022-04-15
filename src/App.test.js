import React from "react";
import { shallow, mount } from "enzyme";
import Login from "./components/login";
import Signup from "./components/signup";
import Landing from "./components/landing";
import JoinedLines from "./components/joinedlines";
import CreatedLines from "./components/createdlines";
import MycreatedLine from "./components/mycreatedline";
import CreateModulePopup from "./components/createpopup";
import Nav from "./components/Nav";

describe("Login", () => {
	it("should render the login page", () => {
		const component = shallow(<Login debug />);
    	expect(component).toMatchSnapshot();
});
});

describe("Signup", () => {
	it("should render the signup page", () => {
		const component = shallow(<Signup debug />);
    	expect(component).toMatchSnapshot();
});
});

describe("Home", () => {
	it("should render the home page", () => {
		const component = shallow(<Landing debug />);
    	expect(component).toMatchSnapshot();
});
});

describe("Joined Queues", () => {
	it("should render the Joined Queues page", () => {
		const component = shallow(<JoinedLines debug />);
    	expect(component).toMatchSnapshot();
});
});

describe("Created Queues", () => {
	it("should render the Created Queues page", () => {
		const component = shallow(<CreatedLines debug />);
    	expect(component).toMatchSnapshot();
});
});

describe("Manage queue", () => {
	it("should render the manage queue page", () => {
		const component = shallow(<MycreatedLine debug />);
    	expect(component).toMatchSnapshot();
});
});

describe("Create queue", () => {
	it("should render the create queue popup", () => {
		const component = shallow(<CreateModulePopup debug />);
    	expect(component).toMatchSnapshot();
});
});

describe("Navbar", () => {
	it("should render the navbar", () => {
		const component = shallow(<Nav debug />);
    	expect(component).toMatchSnapshot();
});
});