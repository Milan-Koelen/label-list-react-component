import { cleanup, render, screen } from '@testing-library/react';

import List from './List';

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

test("Get list items from url", () => {
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

