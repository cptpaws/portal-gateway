import classNames from 'classnames';
import { PropsWithChildren } from 'react';

type OwnProps = PropsWithChildren<{
    className?: string;
}>;

export default function Card({ className, ...rest }: OwnProps) {
    return (
        <div className={classNames(className, 'p-4 bg-gray-800 rounded-md text-slate-200')} {...rest} />
    );
}
