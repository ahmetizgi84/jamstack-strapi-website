//dinamik sayfa için çalışacak metot
export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  const posts = await res.json();
  const paths = posts.map((post) => ({
    params: { post: post.id.toString() },
  }));
  return { paths, fallback: false };
}

// Build-time
export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${params.post}`
  );
  const post = await res.json();
  return { props: { post } };
}

// Page
function PostPage({ post }) {
  return <div>{post.title}</div>;
}
export default PostPage;
