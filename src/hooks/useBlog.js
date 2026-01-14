import { useEffect, useState } from 'react';
import { contactsData } from '../data/contactsData';
import { blogData } from '../data/blogData';

function UseBlog() {
  const [blogs, setBlogs] = useState([]);
  const { devUsername } = contactsData;

  useEffect(() => {
    fetch(`https://dev.to/api/articles?username=${devUsername}`)
      .then((response) => response.json())
      .then(data => {
        const filtered = data.sort(() => Math.random() - 0.5);
        if (filtered.length > 0) {
            setBlogs(filtered)
        } else {
            setBlogs(blogData)
        }
      })
      .catch((error) => {
          console.error("Failed to fetch blogs:", error);
          setBlogs(blogData);
      });
  }, [devUsername]);

  return { blogs };
};

export default UseBlog;