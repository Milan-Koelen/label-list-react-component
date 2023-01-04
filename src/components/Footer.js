import '../index.css';
// Get items from url
const url = window.location.href;
// decode encoded characters

function Footer() {

    return (
        // Footer with link to source code 
        <div className="flex flex-col items-center justify-center w-full h-24">
            <div className="flex items-center justify-center w-full h-24 ">
                <a href="https://github.com/milan-koelen" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-24">
                    <p className="text-sm text-gray-500">By Milan Koelen</p>
                </a>
            </div>
        </div>
    );
}

export default Footer;
