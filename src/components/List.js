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

    // destructure url
    let url = window.location.href;
    if (!url.includes("?")) {
        url = url + '?';
    }
    let domain = url.split('?')[0];
    let params = url.split('?')[1];
    let paramsArray = params.split('&');
    for (let i = 0; i < paramsArray.length; i++) {
        if (paramsArray[i].includes(props.param)) {
            let urlItems = paramsArray[i].split(props.param + "=")[1].split(',');
            urlItems = urlItems.map((item) => decodeURIComponent(item)).filter((item) => item !== '');
        }
    }
    // if param not in url, items will be empty array
    // if param is in url, items will be array of items
    useEffect(() => {
        let url = window.location.href;
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
    }, [props.param,]);

    function handleUrlChange() {

        let url = window.location.href;
        if (!url.includes("?")) {
            url = url + '?';
        }
        let domain = url.split('?')[0];
        let params = url.split('?')[1];
        let paramsArray = params.split('&');
        for (let i = 0; i < paramsArray.length; i++) {
            if (paramsArray[i].includes(props.param)) {
                let urlItems = paramsArray[i].split(props.param + "=")[1].split(',');
                urlItems = urlItems.map((item) => decodeURIComponent(item)).filter((item) => item !== '');
            }
        }
        domain = url.split('?')[0];
        params = url.split('?')[1];
        paramsArray = params.split('&');
        for (let i = 0; i < paramsArray.length; i++) {
            if (paramsArray[i].includes(props.param)) {
                let urlItems = paramsArray[i].split(props.param + "=")[1].split(',');
                urlItems = urlItems.map((item) => decodeURIComponent(item)).filter((item) => item !== '');
                console.log(items)
            }
        }

        console.log("url changed")
        // console.log("current url: ", window.location.href)
        // console.log("current items: ", items)
        // console.log("params array ", paramsArray)
        console.log("changed param is: ", props.param)
        if (items.length === 0) {
            console.log("items is empty")
            // add param with item to url and preserve other params
            const newUrl = domain + '?' + props.param + '=' + input + '&' + paramsArray.filter((param) => !param.includes(props.param)).join('&');


            console.log("new url: ", newUrl)
            setItems([input])
            window.history.pushState({}, '',
                newUrl);

        } else {
            const newItems = [...items, input];
            setItems(newItems);
            const newUrl = domain + '?' + props.param + '=' + items.join(',') + '&' + paramsArray.filter((param) => !param.includes(props.param)).join('&');
            window.history.pushState({}, '',
                // domain + '?' + props.param + '=' + items.join(',') + '&' + paramsArray.filter((param) => !param.includes(props.param)).join('&')
                newUrl
            );
        }
        console.log("new items: ", items)
    }

    function handleSubmit(e) {
        e.preventDefault()
        // Validate Input

        // console.log("onSubmit")
        if (input !== '' || input !== ' ' || input !== undefined) {
            console.log("adding item: ", input)
            addItem(e)
        } else {
            console.log(input, "Invalid input")
        }
    }

    function addItem(e) {
        e.preventDefault()
        console.log("current array ", items)
        console.log(input)

        if (!items.includes(input) && input !== '') {

            handleUrlChange()

            console.log("input is: ", input)
            console.log(...items, input)
            setItems([...items, input]);

        } else {
            console.log(`item "${input}" already in list`)
        }
        setInput("");
    }


    function handleInput(e) {
        setInput(e)
        // console.log("input is: ", input)
    }

    function removeItem(item, e) {
        e.preventDefault()
        // remove item from items array
        // console.log("remove item from " + props.name + ": ", item)
        const newItems = items.filter((t) => t !== item);
        setItems(newItems);
        // update url
        if (newItems.length === 0) {
            window.history.pushState({}, '',
                domain + '?' + paramsArray.filter((param) => !param.includes(props.param)).join('&')
            );
        } else {
            window.history.pushState({}, '',
                domain + '?' + props.param + '=' + newItems.join(',') + '&' + paramsArray.filter((param) => !param.includes(props.param)).join('&')
            );
        }
    }
    return (
        <div className='xs:w-full sm:w-[50vw] md:w-[33vw] lg:w-[20vw] pb-6 mb-2'>
            <h1 className={"text-3xl font-thin my-2 first-letter:capitalize"} data-testid={"title-test-id"}>{props.title}</h1>
            <div className={color + 'border-[.5px] opacity-30 w-full '}></div>
            <form className='pb-2 mx-8' onSubmit={(e) => handleSubmit(e)}>
                <input
                    onChange={(event) => handleInput(event.target.value)}
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
                        className={color + ' text-sm mx-1 px-2 inline-flex rounded-3xl -my-2 first-letter:capitalize hover:border-red-400 text-gray-200 hover:bg-red-400 hover:line-through hover:cursor-pointer'}
                        onClick={(e) => removeItem(item, e)}
                        key={item}
                        data-testid="list-item-test-id">
                        {item}
                    </li>
                ))}
            </ul>
        </div >
    );
}

export default List;
