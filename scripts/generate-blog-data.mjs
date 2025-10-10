import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'blog');
const outputDir = path.join(process.cwd(), 'src', 'data');
const outputFile = path.join(outputDir, 'blog-posts.json');

function getBlogPosts() {
  const filenames = fs.readdirSync(blogDir);
  const posts = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const filePath = path.join(blogDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      // Extract the slug from the filename (e.g., '2025-feconf-review.mdx' -> '2025-feconf-review')
      const slug = filename.replace(/\.mdx$/, '');

      return {
        title: data.title,
        date: data.date,
        description: data.description,
        image: data.image.replace(/,$/, ''), // Remove trailing comma if it exists
        url: `/blog/${slug}`,
      };
    });

  // Sort posts by date in descending order
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function generateBlogData() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const posts = getBlogPosts();
  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
  console.log('Successfully generated blog posts data!');
}

generateBlogData();
