import { useEffect, useState } from 'react';
import '../index.css';
// Get items from url
// decode encoded characters

function List(props) {
    let color = '';
    if (props.solid === true) {
        color = ' border-' + props.color + '-400 bg-' + props.color + '-400 border border-solid ';
        // console.log(color)
    } else {
        color = ' border-' + props.color + '-400 border border-solid ';
        // console.log(color)
    }

    // destructure url
    let url = window.location.href;
    if (!url.includes("?")) {
        url = url + '?';
    }
    const domain = url.split('?')[0];
    const params = url.split('?')[1];
    const paramsArray = params.split('&');
    for (let i = 0; i < paramsArray.length; i++) {
        if (paramsArray[i].includes(props.param)) {
            console.log(paramsArray[i].split(props.param + "=")[1].split(',')[0])
            let urlItems = paramsArray[i].split(props.param + "=")[1].split(',');
            urlItems = urlItems.map((item) => decodeURIComponent(item)).filter((item) => item !== '');
        }
    }


    // urlItems = urlItems.map((item) => decodeURIComponent(item));

    const [items, setItems] = useState([]);
    const [input, setInput] = useState("");


    // if param not in url, items will be empty array
    // if param is in url, items will be array of items
    // only trigger on mount
    useEffect(() => {
        if (!url.includes(props.param)) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            let urlItems = []
            setItems(urlItems);
        } else {
            // remove empty values and add items to state
            let urlItems = url.split(props.param + "=")[1].split("&")[0].split(',');
            urlItems = urlItems.map((item) => decodeURIComponent(item)).filter((item) => item !== '' || item !== ' ' || item !== undefined);
            setItems(urlItems);
        }
    }, [props.param, url]);

    // add tag from text input
    function addItem(input) {
        input.preventDefault();
        // prevent default form submission or existing items
        if (items.includes(input) || input === '' || input === ' ' || input === undefined) {
            console.log(input, " is already in the list or is empty")
            return false;
        } else {
            for (let i = 0; i < input.target.length; i++) {
                if (input.target[i].name === props.param) {
                    input = input.target[i].value;
                    const newItems = [...items, input];
                    setItems(newItems);
                    // update url
                    window.location.assign(
                        domain + '?' + props.param + '=' + newItems.join(',') + '&' + paramsArray.filter((param) => !param.includes(props.param)).join('&')
                    );
                    // console.log("new items are: ", newItems)
                }
            }
        }
        setInput("");
        // clear input
    }
    function handleInput(e) {
        setInput(e.target.value);
        // console.log("input is: ", input)
    }

    function removeItem(item) {
        // remove item from items array
        console.log("remove item from " + props.name + ": ", item)
        const newItems = items.filter((t) => t !== item);
        setItems(newItems);
        // update url
        if (newItems.length === 0) {
            window.location.assign(
                domain + '?' + paramsArray.filter((param) => !param.includes(props.param)).join('&')
            );
        } else {
            window.location.assign(
                domain + '?' + props.param + '=' + newItems.join(',') + '&' + paramsArray.filter((param) => !param.includes(props.param)).join('&')
            );
        }
    }
    return (
        <div className='xs:w-full sm:w-[50vw] md:w-[33vw] lg:w-[20vw] pb-6'>
            <div className='mb-2'>
                <h1 className={"text-3xl font-thin my-2 first-letter:capitalize"} data-testid={"title-test-id"}>{props.title}</h1>
                <div className={color + 'border-[.5px] opacity-30 w-full '}></div>
                <form className='pb-2 mx-8' onSubmit={addItem}>
                    <input
                        onChange={handleInput}
                        type="text"
                        id={props.param + '-input'}
                        placeholder={"Add " + props.param}
                        value={input}
                        name={props.param}
                        data-testid="input-test-id"
                        className={'text-center opacity-80 text-sm rounded-lg w-full bg-opacity-20 bg-gray-200 border-bottom text-gray-200 border-gray-300'}
                    />
                </form>
                <ul className=''>
                    {items.length === 0 &&
                        <li className='text-sm mx-1 px-2 inline-flex border-solid border opacity-50 rounded-3xl text-gray-400 border-red-400 -my-2' dataa-testid={"no-items-test-id"}>
                            No {props.param}
                        </li>
                    }
                    {items.map((item) => (
                        // item !== '' &&
                        <li
                            // eslint-disable-next-line no-multi-str
                            className={color + ' text-sm mx-1 px-2 inline-flex rounded-3xl -my-2 first-letter:capitalize hover:border-red-400 text-gray-200 hover:bg-red-400 hover:line-through hover:cursor-pointer'}
                            onClick={() => removeItem(item)}
                            key={item}
                            data-testid="list-item-test-id">
                            {item}
                        </li>
                    ))}
                </ul>
            </div >
        </div >
    );
}

export default List;
