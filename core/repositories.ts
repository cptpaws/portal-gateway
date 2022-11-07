interface RawRepository {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
}

export interface Repository {
    id: number;
    name: string;
    description: string;
    homepage: string;
    githubUrl: string;
    githubHandle: string;
}

interface RepositoryManifest {
    identifier: string;
    name: string;
    description: string;
    homepage: string;
    hidden: true;
}

const GITHUB_USER_REPOS = 'https://api.github.com/user/repos';
const GITHUB_MANIFEST_PATH = 'https://raw.githubusercontent.com/:repository/main/portal.manifest.json';

export async function getRepositories(): Promise<Repository[]> {
    const response = await fetch(GITHUB_USER_REPOS, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
        }
    });

    const allRepositories: RawRepository[] = await response.json();
    const portalRepositories = allRepositories.filter(repo => repo.name.startsWith('p-app-'));

    const manifestFiles: RepositoryManifest[] = await Promise.all(portalRepositories.map(async repo => {
        const url = GITHUB_MANIFEST_PATH.replace(':repository', repo.full_name);
        const response = await fetch(url);

        if (response.status === 404) {
            return null;
        }

        return response.json();
    }));

    return portalRepositories.filter((repo, idx) => process.env.APP_ENV !== 'production' || !manifestFiles[idx].hidden)
        .map((repo, idx) => ({
            id: repo.id,
            name: manifestFiles[idx].name,
            description: manifestFiles[idx].description,
            homepage: manifestFiles[idx].homepage ?? '',
            githubUrl: repo.html_url,
            githubHandle: repo.full_name,
        }));
}
