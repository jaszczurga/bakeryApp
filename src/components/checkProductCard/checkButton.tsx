import Link from 'next/link';

type CheckButton = {
    href: string;
}

export const CheckButton: React.FC<CheckButton> = ({href}) => {
    return (
        <Link
                href={href}
                className="absolute text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-3.5 text-center inline-flex items-center mr-2 mb-2 bottom-0 right-0">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
            <span className="sr-only">Icon description</span>
        </Link>
    )
}