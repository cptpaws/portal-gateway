import Card from '../components/Card';
import { getRepositories, Repository } from '../core/repositories';
import classNames from 'classnames';
import { FaGithub } from 'react-icons/fa';

interface PageProps {
    repositories: Repository[];
}

const responsiveGridClass = classNames([
    'grid justify-center items-center w-full gap-5 px-6 py-6 animate-fade',
    'xl:px-64 xl:py-16',
    'lg:grid-cols-4 lg:px-48 lg:py-12',
    'md:grid-cols-2 md:px-24 md:py-8',
    'sm:grid-cols-1 sm:px-12 sm:py-6',
]);

export default function Gateway({ repositories }: PageProps) {
    return (
        <div>
            <div className="flex justify-center mt-6 xl:mt-16 lg:mt-12 md:mt-8 sm:mt-6">
                <p className="text-white italic animate-fade">
                    Feel free to use any of the tools below...
                </p>
            </div>
            <div className={responsiveGridClass}>
                {repositories.map(repo => (
                    <Card key={repo.id} className="h-full shadow-lg">
                        <h2 className="text-lg font-medium">
                            <a href={repo.homepage}>
                                {repo.name}
                            </a>
                        </h2>
                        <p className="text-xs mt-4">{repo.description}</p>
                        <div className="flex justify-end mt-4 gap-5">
                            <a href={repo.githubUrl} target="_blank" className="text-xl hover:animate-pulse focus:animate-pulse">
                                <FaGithub/>
                            </a>
                        </div>
                    </Card>
                ))}
            </div>
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
