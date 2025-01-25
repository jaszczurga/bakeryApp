
type Props = {
    href: string;

}

export const CheckoutButton: React.FC<Props> = ({href}) => {
    return (
        <a className="bg-green-700 text-white text-xl p-3 rounded-md" href={href}>Checkout</a>
    )
}