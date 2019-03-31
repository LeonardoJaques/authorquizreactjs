import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import ReactDOM from "react-dom";

function Hello(props) {
    return <h1>Hello at {props.now} </h1>;
}
const moment = new Date(158894640000)

describe("When setting up testing", () => {
    let result;
    beforeAll((() => {
        result = Hello({
            now: moment.toISOString()
        })
    }));
    it("Return a value", () => {
        expect(result).not.toBeNull();
    });
    it("Is a h1", () => {
        expect(result.type).toBe("h1");
    });
    it("has children", () => {
        expect(result.props.children).toBeTruthy();
    });
});

describe("When testing with ReactDOM", () => {
    it("Renders whithout crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Hello now={moment.toISOString()} />, div);
    })
});

Enzyme.configure({ adapter: new Adapter() });
describe("When testing whith enzyme", () => {
    it("renders a h1", () => {
        const wrapper = shallow(<Hello now={moment.toISOString()} />);
        expect(wrapper.find("h1").length).toBe(1);
    });

    it("Contains Hello at 2020-05-08T14: 00:00:000Z", () => {
        const wrapper = shallow(<Hello now={moment.toISOString()} />);
        expect(wrapper.contains(<h1>Hello at 2020-05-08T14: 00:00:000Z</h1>)).toBe(false);
    });
});