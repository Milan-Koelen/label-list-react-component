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
        const domain = url.split('?')[0];
        let params = url.split('?')[1];
        const paramsArray = params.split('&').filter(param => !param.includes(props.param));
        console.log("paramsArray: ", paramsArray)
        let urlItems = [];
        if (params.includes(props.param)) {
            urlItems = params.split(props.param + "=")[1].split(',').map(item => decodeURIComponent(item)).filter(item => item !== '');
            console.log("urlItems: ", urlItems)
            console.log("state items: ", items)
        }
        paramsArray.push(`${props.param}=${items.join(",")}`);
        const newUrl = `${domain}?${paramsArray.join("&")}`;

        window.history.pushState({}, '', newUrl);
        console.log("url changed", newUrl);
    }



    function handleSubmit(e) {
        e.preventDefault()
        // Validate Input

        if (input !== '' || input !== ' ' || input !== undefined) {
            console.log("adding item: ", input)
            // If input is a comma separated list, add each item to list
            if (input.includes(',')) {
                input.split(',').map((item) => {
                    if (!items.includes(item)) {
                        console.log("adding item: ", item)
                        setItems([...items, item]);
                        handleUrlChange()
                        return item
                    } else {
                        console.log(`item "${item}" is already in list or is empty`)
                        return "item already in list"
                    }
                })
            } else {
                if (!items.includes(input)) {
                    console.log("adding item: ", input)
                    setItems([...items, input]);
                    handleUrlChange()
                } else {
                    console.log(`item "${input}" is already in list or is empty`)
                }
            }
            setInput("");
        }
    }

    // function addItem(e) {
    //     e.preventDefault()
    //     console.log("current array ", items)
    //     console.log(input)

    //     if (!items.includes(input) && input !== '') {

    //         input.split(',').map((item) => {
    //             if (!items.includes(item)) {
    //                 console.log("adding item: ", item)
    //                 setItems([...items, item]);
    //                 handleUrlChange()
    //                 return item
    //             } else {
    //                 console.log(`item "${item}" is already in list or is empty`)
    //                 return "item already in list"
    //             }
    //         })

    //     } else {
    //         console.log(`item "${input}" already in list`)
    //     }
    //     setInput("");
    // }


    function handleInput(input) {
        // separate input by commas
        if (input.includes(',')) {
            // let newInput = input.split(',');
            input = input.split(',')((item) => item.trim());
            // setInput(newInput);
        }
        // if (e.target.value.includes(',')) {
        //     let newInput = e.target.value.split(',');
        //     newInput = newInput.map((item) => item.trim());
        //     setInput(newInput);
        // }
        setInput(input)
        // console.log("input is: ", input)
    }

    function removeItem(item, e) {
        e.preventDefault()
        // console.log("remove item from " + props.name + ": ", item)
        const newItems = items.filter((t) => t !== item);
        setItems(newItems);
        // update url
        if (newItems.length === 0) {
            handleUrlChange()
            // window.history.pushState({}, '',
            //     domain + '?' + paramsArray.filter((param) => !param.includes(props.param)).join('&')
            // );
        } else {
            // const newUrl = domain + '?' + props.param + '=' + newItems.join(',') + '&' + paramsArray.filter((param) => !param.includes(props.param)).join('&');
            // window.history.pushState({}, '',
            //     domain + '?' + props.param + '=' + newItems.join(',') + '&' + paramsArray.filter((param) => !param.includes(props.param)).join('&')
            // );
            handleUrlChange()
        }
    }
    return (
        <div className='pb-6 mb-2'>
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
