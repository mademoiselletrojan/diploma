import { getBlogPostById } from '../../../../../lib/blogData';
import styles from '@/../src/styles/Postpage.module.scss';

export default async function PostPage({ params }) {
  const post = await getBlogPostById('english', 'blog', params.postId);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <Image
        src={post.imageSrc}
        alt={post.title}
        width={200}
        height={200}
        className={styles.image}
      />
      <p className={styles.content}>{post.content}</p>
    </div>
  );
}