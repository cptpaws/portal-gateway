interface Repository {
    id: number;
    name: string;
    description: string;
    html_url: string;
}

interface PageProps {
    repositories: Repository[];
}

export default function Gateway({ repositories }: PageProps) {
    console.log(repositories);

    return (
        <div>
            Hello world!
        </div>
    );
}

export async function getStaticProps() {
    const response = await fetch('https://api.github.com/user/repos', {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
        }
    });

    const allRepositories: Repository[] = await response.json();

    console.log(allRepositories);

    return {
        revalidate: 86400,
        props: {
            repositories: allRepositories.filter(repo => repo.name.startsWith('portal-')),
        },
    };
}
