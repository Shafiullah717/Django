export async function getServerSideProps() {
  const url = "http://127.0.0.1:8000/api/posts/";
  let posts = [];

  try {
    const res = await fetch(url);
    const json = await res.json();
    if (json.status === 200) {
      posts = json.payload;
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div className="min-h-screen p-8 sm:p-20 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">Posts from Django (SSR)</h1>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500 text-sm">
              by {post.author} • {new Date(post.created_at).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-700">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}












// This is with server side rendering..........................................................

// import { useState } from 'react';

// export default function Home() {
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState('');

//   async function DjangoApiData() {
//     const url = "http://127.0.0.1:8000/api/posts/";
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//       }
//       const json = await response.json();
//       setPosts(json.payload);
//     } catch (err) {
//       setError(err.message);
//       console.error(err.message);
//     }
//   }

//   async function handleClick() {
//     await DjangoApiData();
//   }

//   return (
//     <div className="min-h-screen p-8 sm:p-20 font-sans">
//       <button
//         onClick={handleClick}
//         className="px-4 py-2 mb-8 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Get Data
//       </button>

//       {error && <p className="text-red-600">{error}</p>}

//       <div className="space-y-6">
//         {posts.map(post => (
//           <div key={post.id} className="border p-4 rounded shadow">
//             <h2 className="text-xl font-semibold">{post.title}</h2>
//             <p className="text-gray-500 text-sm">by {post.author} • {new Date(post.created_at).toLocaleDateString()}</p>
//             <p className="mt-2 text-gray-700">{post.content}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
