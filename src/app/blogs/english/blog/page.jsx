import Link from 'next/link';
import Image from 'next/image';
// import styles from '@/styles/BlogPage.module.scss';
import { getBlogPosts } from '../../../../lib/blogData';

export default async function EnglishBlogPage() {
  const posts = await getBlogPosts('english', 'blog');

  return (
    <div className={styles.container}>
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={styles.row}
          style={{
            height: index % 2 === 0 ? '200px' : '100px',
            display: 'flex',
            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
          }}
        >
          <div className={styles.column} style={{ width: index % 2 === 0 ? '200px' : '100px' }}>
            <Link href={`/blogs/english/blog/${post.id}`}>
              <Image
                src={post.imageSrc}
                alt={post.title}
                width={100}
                height={100}
                className={styles.image}
              />
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.description}>{post.description}</p>
            </Link>
          </div>
          <div className={styles.column} style={{ width: index % 2 === 0 ? '100px' : '200px' }}>
            {posts[index + 1] && (
              <Link href={`/blogs/english/blog/${posts[index + 1].id}`}>
                <Image
                  src={posts[index + 1].imageSrc}
                  alt={posts[index + 1].title}
                  width={100}
                  height={100}
                  className={styles.image}
                />
                <h3 className={styles.title}>{posts[index + 1].title}</h3>
                <p className={styles.description}>{posts[index + 1].description}</p>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}