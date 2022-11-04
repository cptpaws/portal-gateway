import Card from '../components/Card';
import { getRepositories, Repository } from '../core/repositories';
import classNames from 'classnames';

interface PageProps {
    repositories: Repository[];
}

const responsiveGridClass = classNames([
    'grid justify-center items-center w-full gap-5',
    'lg:grid-cols-4',
    'md:grid-cols-2',
    'sm:grid-cols1',
]);

const responsivePageContainer = classNames([
    'h-screen flex items-center px-6 py-6',
    'xl:px-64 xl:py-32',
    'lg:px-48 lg:py-24',
    'md:px-24 md:py-16',
    'sm:px-12 sm:py-12',
]);

export default function Gateway({ repositories }: PageProps) {
    return (
        <div className={responsivePageContainer}>
            <ul className={responsiveGridClass}>
                {repositories.map(repo => (
                    <Card key={repo.id}>
                        <h2 className="text-lg font-medium">{repo.name}</h2>
                        <p className="text-sm mt-4">{repo.description}</p>
                    </Card>
                ))}
            </ul>
        </div>
    );
}

export async function getStaticProps() {
    const repositories = await getRepositories();

    return {
        revalidate: 86400,
        props: { repositories },
    };
}
