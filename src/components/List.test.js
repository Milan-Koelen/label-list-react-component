import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { default as List } from './List';


afterEach(cleanup);

// after each test, reset the url
afterEach(() => {
    delete window.location;
    window.location = { href: "http://dummy.com" };
});

test('Title text', () => {
    Object.defineProperty(window, 'location', {
        value: {
            href: "http://dummy.com/?tags=tag1,tag2,tag3",
            writable: true
        }
    });
    render(<List param={"tags"} title={"Tags"} />);
    const title = screen.getByTestId("title-test-id");
    expect(title).toHaveTextContent("Tags");
});

test('Non solid color from props', () => {
    Object.defineProperty(window, 'location', {
        value: {
            href: "http://dummy.com/?tags=tag1,tag2,tag3",
            writable: true
        }
    });
    render(<List param={"tags"} title={"Tags"} color={"red"} solid={false} />);
    const listItems = screen.getAllByTestId("list-item-test-id");
    expect(listItems[0]).toHaveClass('border', 'border-solid', 'border-red-400', 'text-gray-200');
    expect(listItems[1]).toHaveClass('border', 'border-solid', 'border-red-400', 'text-gray-200');
    expect(listItems[2]).toHaveClass('border', 'border-solid', 'border-red-400', 'text-gray-200');
});

test('Solid color from props', () => {
    Object.defineProperty(window, 'location', {
        value: {
            href: "http://dummy.com/?tags=tag1,tag2,tag3",
            writable: true
        }
    });
    render(<List param={"tags"} title={"Tags"} color={"red"} solid={true} />);
    const listItems = screen.getAllByTestId("list-item-test-id");
    expect(listItems[0]).toHaveClass('bg-red-400', 'text-gray-200');
    expect(listItems[1]).toHaveClass('bg-red-400', 'text-gray-200');
    expect(listItems[2]).toHaveClass('bg-red-400', 'text-gray-200');
});

test("Get list items from url", async () => {
    Object.defineProperty(window, 'location', {
        value: {
            href: "http://dummy.com/?tags=test1,test2,test3",
            writable: true
        }
    });
    render(<List param={"tags"} title={"Tags"} />);
    const listItems = screen.getAllByTestId("list-item-test-id");

    expect(listItems).toHaveLength(3);
    expect(listItems[0]).toHaveTextContent("test1");
    expect(listItems[1]).toHaveTextContent("test2");
    expect(listItems[2]).toHaveTextContent("test3");
});

test("Decode unicode characters from url", () => {
    Object.defineProperty(window, 'location', {
        value: {
            href: "http://dummy.com/?tags=%25,%3F,%26,%3D,%24,%7B%7D",
            writable: true
        }
    });
    render(<List param={"tags"} title={"Tags"} />);
    const listItems = screen.getAllByTestId("list-item-test-id");

    expect(listItems[0]).toHaveTextContent('%'); // percent sign (%25)
    expect(listItems[1]).toHaveTextContent('?'); // question mark (%3F)
    expect(listItems[2]).toHaveTextContent('&'); // ampersand (%26)
    expect(listItems[3]).toHaveTextContent('='); // equals sign (%3D)
    expect(listItems[4]).toHaveTextContent('$'); // dollar sign (%24)
    expect(listItems[5]).toHaveTextContent('{}'); // curly braces (%7B%7D)

});

test('Empty list warning', () => {
    Object.defineProperty(window, 'location', {
        value: {
            href: "http://dummy.com/",
            writable: true
        }
    });
    render(<List param={"tags"} title={"Tags"} />);
    const noItem = screen.getByTestId("no-items-test-id");
    expect(noItem).toHaveTextContent("No tags");
    const message = screen.getByTestId("no-items-test-id");
    expect(message).toHaveTextContent("No tags");
});

test('Invalid input', () => {
    Object.defineProperty(window, 'location', {
        value: {
            href: "http://dummy.com/?tags=tag1,tag2,tag3",
            writable: true
        }
    });
    render(<List param={"tags"} title={"Tags"} color={"green"} solid={true} />);
    const input = screen.getByTestId("input-test-id");
    const form = screen.getByTestId("form-test-id");
    fireEvent.change(input, { target: { value: "tag1" } });
    fireEvent.submit(form)
    const listItems = screen.getAllByTestId("list-item-test-id");
    expect(listItems).toHaveLength(3);
    expect(listItems[0]).toHaveTextContent("tag1");
    expect(listItems[1]).toHaveTextContent("tag2");
    expect(listItems[2]).toHaveTextContent("tag3");
    expect(listItems[0]).toHaveClass("bg-green-100");
});

test('Add item', () => {
    Object.defineProperty(window, 'location', {
        value: {
            href: "http://dummy.com/?tags=tag1,tag2,tag3",
            writable: true
        }
    });

    render(<List param={"tags"} title={"Tags"} />);
    const input = screen.getByTestId("input-test-id");
    const form = screen.getByTestId("form-test-id");

    fireEvent.change(input, { target: { value: "tag4" } });
    fireEvent.submit(form);

    // Rerender to get updated list

    const listItems2 = screen.getAllByTestId("list-item-test-id");

    // Check list length
    expect(listItems2).toHaveLength(4);
    // Check item values
    expect(listItems2[0]).toHaveTextContent("tag1");
    expect(listItems2[1]).toHaveTextContent("tag2");
    expect(listItems2[2]).toHaveTextContent("tag3");
    expect(listItems2[3]).toHaveTextContent("tag4");
    expect(input).toHaveValue("");
});

test("Add multiple items", () => {
    Object.defineProperty(window, 'location', {
        value: {
            href: "http://dummy.com/?tags=tag1,tag2,tag3",
            writable: true
        }
    });

    render(<List param={"tags"} title={"Tags"} />);
    const input = screen.getByTestId("input-test-id");
    const form = screen.getByTestId("form-test-id");

    fireEvent.change(input, { target: { value: "tag4,tag5,tag6" } });
    fireEvent.submit(form);

    // Rerender to get updated list

    const listItems2 = screen.getAllByTestId("list-item-test-id");

    // Check list length
    expect(listItems2).toHaveLength(6);
    // Check item values
    expect(listItems2[0]).toHaveTextContent("tag1");
    expect(listItems2[1]).toHaveTextContent("tag2");
    expect(listItems2[2]).toHaveTextContent("tag3");
    expect(listItems2[3]).toHaveTextContent("tag4");
    expect(listItems2[4]).toHaveTextContent("tag5");
    expect(listItems2[5]).toHaveTextContent("tag6");
    expect(input).toHaveValue("");
});