import { Star, GitFork } from "lucide-react";
import { siteConfig } from "@/config/site";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
}

async function fetchRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${siteConfig.socials.githubUser}/repos?per_page=30&sort=updated`,
      {
        headers: { Accept: "application/vnd.github+json" },
        // ISR — refresh every 6 hours
        next: { revalidate: 60 * 60 * 6 },
      },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as Repo[];
    return data
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3);
  } catch {
    return [];
  }
}

export async function GithubActivity() {
  const repos = await fetchRepos();
  if (!repos.length) return null;

  return (
    <div className="mt-10 rounded-xl border border-border bg-card/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Recent public repos
        </h3>
        <a
          href={siteConfig.socials.github}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] text-muted-foreground hover:text-accent"
        >
          @{siteConfig.socials.githubUser}
        </a>
      </div>
      <ul className="grid gap-3 sm:grid-cols-3">
        {repos.map((repo) => (
          <li key={repo.id}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col justify-between rounded-lg border border-border/70 bg-background/60 p-4 transition-colors hover:border-accent/40"
            >
              <div>
                <p className="font-mono text-sm text-foreground group-hover:text-accent">
                  {repo.name}
                </p>
                {repo.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {repo.description}
                  </p>
                )}
              </div>
              <div className="mt-3 flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
                {repo.language && (
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-accent/60" />
                    {repo.language}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {repo.stargazers_count}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork className="h-3 w-3" />
                  {repo.forks_count}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
