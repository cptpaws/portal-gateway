import Card from '../components/Card';

interface RawRepository {
    id: number;
    name: string;
    description: string;
    html_url: string;
}

interface Repository {
    id: number;
    name: string;
    description: string;
    githubUrl: string;
}

interface PageProps {
    repositories: Repository[];
}

export default function Gateway({ repositories }: PageProps) {
    return (
        <div>
            <ul className="flex justify-center align-center ">
                {repositories.map(repo => (
                    <Card key={repo.id}>
                        {repo.name}
                    </Card>
                ))}
            </ul>
        </div>
    );
}

export async function getStaticProps() {
    const response = await fetch('https://api.github.com/user/repos', {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
        }
    });

    const allRepositories: RawRepository[] = await response.json();

    return {
        revalidate: 86400,
        props: {
            repositories: allRepositories.filter(repo => repo.name.startsWith('portal-'))
                .map(repo => ({
                    id: repo.id,
                    name: repo.name,
                    description: repo.description,
                    githubUrl: repo.html_url,
                })),
        },
    };
}
