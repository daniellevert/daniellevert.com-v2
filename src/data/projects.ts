export type Project = {
  name: string
  description?: string
  url: string
  image?: string
}

// You can replace this list or connect to GitHub API below.
export const curatedProjects: Project[] = [
  // Add your own curated projects here for full control over order and images.
  // { name: "If You Know, You Know — Met Gala", description: "Fashion & culture video series.", url: "https://youtube.com/...", image: "/images/projects/iykyk-metgala.jpg" }
]
