import { useParams } from "react-router-dom";
import PostSingle from "../components/layouts/PostSingle";

const articleData = {
    image: "/images/post-1.png",
    title: "How to make toys from old Olarpaper",
    description: `Web development continues to evolve rapidly. From AI-powered tools to edge computing, developers must constantly adapt to new technologies and workflows`,
    tags: ['TECHNOLOGY', 'AI', 'CODING', 'PROGRAMMING', 'FRONTEND', 'REACT', 'IMAGE', 'DATATABLE'],
    likeCount: 350,
    viewCount: 500,
    createdAt: "2022-04-04T01:00:00Z",
    category: "programming",
    publisher: "Statichunt",
    articleBody: `
<p>
  Web development continues to evolve rapidly. From <strong>AI-powered tools</strong> 
  to <em>edge computing</em>, developers must constantly adapt to new technologies 
  and workflows.
</p>

<h2>1. The Rise of AI-Assisted Development</h2>

<p>
  Artificial Intelligence is transforming how developers write code. Tools now help with:
</p>

<ul>
  <li>Code completion and suggestions</li>
  <li>Automated testing</li>
  <li>Refactoring legacy systems</li>
  <li>Generating documentation</li>
</ul>

<blockquote>
  "AI will not replace developers — but developers using AI will replace those who don’t."
</blockquote>

<h2>2. Modern Frontend Frameworks</h2>

<p>
  Frameworks like React, Vue, and Svelte are shaping modern UI development. 
  Component-based architecture improves reusability and maintainability.
</p>

<h3>Example React Component</h3>

<pre>
<code className="language-jsx">function Welcome({ name }) {
  return &lt;h1&gt;Hello, {name}!&lt;/h1&gt;;
}
  function Welcome({ name }) {
  return &lt;h1&gt;Hello, {name}!&lt;/h1&gt;;
}
  function Welcome({ name }) {
  return &lt;h1&gt;Hello, {name}!&lt;/h1&gt;;
}
  function Welcome({ name }) {
  return &lt;h1&gt;Hello, {name}!&lt;/h1&gt;;
}</code>
</pre>

<h2>3. Performance & Optimization</h2>

<p>
  Performance is critical for user experience and SEO. Key techniques include:
</p>

<ol>
  <li>Lazy loading images</li>
  <li>Code splitting</li>
  <li>Using CDN for static assets</li>
  <li>Server-side rendering (SSR)</li>
</ol>

<h2>4. Sample Data Table</h2>

<table border="1" cellpadding="8" cellspacing="0">
  <thead>
    <tr>
      <th>Technology</th>
      <th>Category</th>
      <th>Popularity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>React</td>
      <td>Frontend</td>
      <td>High</td>
    </tr>
    <tr>
      <td>Spring Boot</td>
      <td>Backend</td>
      <td>High</td>
    </tr>
    <tr>
      <td>PostgreSQL</td>
      <td>Database</td>
      <td>High</td>
    </tr>
  </tbody>
</table>

<h2>5. Image Example</h2>

<p>Below is a sample image:</p>

<img 
  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" 
  alt="Web Development Illustration" 
  style="max-width:100%; height:auto;" 
/>

<h2>6. Embedded Video Example</h2>

<p>Educational video on modern web architecture:</p>

<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
  title="YouTube video player" 
  frameborder="0" 
  allowfullscreen>
</iframe>

<h2>Conclusion</h2>

<p>
  The future of web development is exciting and fast-moving. Developers who 
  continuously learn and experiment with new technologies will stay ahead in 
  the industry.
</p>

<p>
  <a href="https://example.com">Read more articles here →</a>
</p>`,
  mediaList: [],
  videoUrl: "",
  comments: [
    {
      name: "Michael Gough",
      text: "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
      createdAt: "2022-04-04T01:00:00Z"
    },
    {
      name: "Bonnie Green",
      text: "The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.",
      createdAt: "2022-03-12T08:30:00Z"
    },
    {
      name: "Helene Engels",
      text: "Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.",
      createdAt: "2022-05-19T24:55:00Z"
    },
  ]
}    

const galleryData = {
    image: "/images/post-1.png",
    title: "How to make toys from old Olarpaper",
    description: `Web development continues to evolve rapidly. From AI-powered tools to edge computing, developers must constantly adapt to new technologies and workflows`,
    tags: ['TECHNOLOGY', 'AI', 'CODING', 'PROGRAMMING', 'FRONTEND', 'REACT', 'IMAGE', 'DATATABLE'],
    likeCount: 350,
    viewCount: 500,
    createdAt: "2022-04-04T01:00:00Z",
    category: "programming",
    publisher: "Statichunt",
    articleBody: "",
    mediaList: [
      {
        url: "/images/post-2.png",
        alt: "post-2.png",
      },
      {
        url: "/images/post-3.png",
        alt: "post-3.png",
      },
      {
        url: "/images/post-4.png",
        alt: "post-4.png",
      },
      {
        url: "/images/post-5.png",
        alt: "post-5.png",
      },
      {
        url: "/images/post-6.png",
        alt: "post-6.png",
      },
      {
        url: "/images/post-7.png",
        alt: "post-7.png",
      },
      {
        url: "/images/post-8.png",
        alt: "post-8.png",
      },
    ],
    videoUrl: "",
    comments: [
    {
      name: "Michael Gough",
      text: "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
      createdAt: "2022-04-04T01:00:00Z"
    },
    {
      name: "Bonnie Green",
      text: "The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.",
      createdAt: "2022-03-12T08:30:00Z"
    },
    {
      name: "Helene Engels",
      text: "Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.",
      createdAt: "2022-05-19T24:55:00Z"
    },
  ],
}   

const videoData = {
    image: "/images/post-1.png",
    title: "How to make toys from old Olarpaper",
    description: `Web development continues to evolve rapidly. From AI-powered tools to edge computing, developers must constantly adapt to new technologies and workflows`,
    tags: ['TECHNOLOGY', 'AI', 'CODING', 'PROGRAMMING', 'FRONTEND', 'REACT', 'IMAGE', 'DATATABLE'],
    likeCount: 350,
    viewCount: 500,
    createdAt: "2022-04-04T01:00:00Z",
    category: "programming",
    publisher: "Statichunt",
    articleBody: "",
    mediaList: [],
    videoUrl: "https://www.youtube.com/watch?v=GowNMaSS59Q",
    comments: [
    {
      name: "Michael Gough",
      text: "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
      createdAt: "2022-04-04T01:00:00Z"
    },
    {
      name: "Bonnie Green",
      text: "The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.",
      createdAt: "2022-03-12T08:30:00Z"
    },
    {
      name: "Helene Engels",
      text: "Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.",
      createdAt: "2022-05-19T24:55:00Z"
    },
  ],
}  

export const ContentDetailPage = () => {
  const { id } = useParams();

  if(id === '1') return (<PostSingle data={articleData}/>)

  if(id === '2') return (<PostSingle data={galleryData}/>)

  if(id === '3') return (<PostSingle data={videoData}/>)
}