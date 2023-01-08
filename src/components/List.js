import { useEffect, useState } from 'react';
import '../index.css';
function List(props) {
    let color = '';
    if (props.solid === true) {
        color = ' border-' + props.color + '-400 bg-' + props.color + '-400 border border-solid ';
        // console.log(color)
    } else {
        color = ' border-' + props.color + '-400 border border-solid ';
        // console.log(color)
    }

    const [items, setItems] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        let url = window.location.href;
        if (!url.includes(props.param) || !url.includes(props.param + "=")) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            console.log("url: ", url)
        } else {
            // remove empty, decode characters values and add items to state
            let urlItems = url.split(props.param + "=")[1].split("&")[0].split(',');
            urlItems = urlItems.map((item) =>
                decodeURIComponent(item)).filter((item) =>
                    item !== '' || item !== ' ' || item !== undefined);
            // console.log("urlItems: ", urlItems)
            setItems(urlItems);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleUrlChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])

    function handleSubmit(e) {
        e.preventDefault()
        // INPUT VALIDATION
        // EMPTY INPUT
        if (input === '' || input === ' ' || input === undefined) {
            alert("Please enter a valid value");

            // ITEM ALREADY EXISTS
        } if (items.includes(input)) {
            const item = document.getElementById(input + props.param);
            // remove and add class to trigger animation
            item.classList.remove('border', 'border-solid', 'border-' + props.color + '-400', 'bg-' + props.color + '-400', 'text-gray-200');
            item.classList.add('border', 'border-solid', 'border-' + props.color + '-100', 'bg-' + props.color + '-100', 'text-gray-600');
            setTimeout(() => {
                if (props.solid === true) {
                    item.classList.add('bg-' + props.color + '-400');
                }
                item.classList.remove('border', 'border-solid', 'border-' + props.color + '-100', 'bg-' + props.color + '-100', 'text-gray-600');
                item.classList.add('border', 'border-solid', 'border-' + props.color + '-400', 'text-gray-200');
            }, 1000);
        }
        else {
            // check and separate for commas
            if (input.includes(",")) {
                // console.log("input includes commas: ", input)
                const inputArray = input.split(",");
                console.log("inputArray: ", inputArray)
                // inputArray.forEach(() => {
                setItems((items) => [...items, ...inputArray]);
                // if (item !== '' || item !== ' ' || item !== undefined) {
                //     setItems([...items, item]);
                // }
                // })
            }
            setItems([...items, input]);
            console.log("New Items Array: ", items)
        }
        setInput("");
    }

    function handleUrlChange() {
        let url = window.location.href;
        if (!url.includes("?")) {
            url = url + '?';
        }
        let params = url.split('?')[1];
        // preserve other params
        const paramsArray = params.split('&').filter(param => !param.includes(props.param));
        let urlParams = '';
        if (items.length === 0) {
            // if no items, remove param from url
            urlParams = `?${paramsArray.join("&")}`;
        } else {
            paramsArray.push(`${props.param}=${items.join(",")}`);
            // console.log("paramsArray: ", paramsArray)
            urlParams = `?${paramsArray.join("&")}`;
        }
        window.history.replaceState({}, '', urlParams);
    }

    function handleDeleteItem(item) {
        const updatedList = items.filter((i) => i !== item);
        if (updatedList === []) {
            setItems([]);
        } else {
            setItems([...updatedList]);
            // console.log("listLength:", items.length)
        }
    }

    return (
        <div className='pb-6 mb-2'>
            <h1 className={"text-3xl font-thin my-2 first-letter:capitalize"} data-testid={"title-test-id"}>{props.title}</h1>
            <div className={color + 'border-[.5px] opacity-30 w-full '}></div>
            <form className='pb-2 mx-8' data-testid={"form-test-id"} onSubmit={(e) => handleSubmit(e)}>
                <input
                    onChange={(event) => setInput(event.target.value)}
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
                    <li className='text-sm mx-1 px-2 inline-flex border-solid border opacity-50 rounded-3xl text-gray-400 border-red-400 -my-2' data-testid="no-items-test-id">
                        No {props.param}
                    </li>
                }
                {items.map((item) => (
                    // item !== '' &&
                    <li
                        // eslint-disable-next-line no-multi-str
                        className={color + 'transition ease-in-out duration-500 text-sm mx-1 px-2 inline-flex rounded-3xl -my-2 first-letter:capitalize hover:border-red-400 text-gray-200 hover:bg-red-400 hover:line-through hover:cursor-pointer'}
                        onClick={(e) => handleDeleteItem(item)}
                        key={item + props.param}
                        id={item + props.param}
                        data-testid="list-item-test-id">
                        {item}
                    </li>
                ))}
            </ul>
        </div >
    );
}
export default List;
