import React, { useContext } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/theme-context';
import BlogCard from './blog-card/blog-card';
import './blog.css';

const BlogUI = ({ classes, blogData }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className="blog" id="blog"
      style={{ backgroundColor: theme.secondary }}>
      <div className="blog--header">
        <h1 style={{ color: theme.primary }}>Blog</h1>
      </div>
      <div className="blog--body">
        <div className="blog--viewAll">
          <a href="https://writetech-accelerator-portfolio-abd.vercel.app/" target="_blank" rel="noreferrer">
            <button className={classes.viewAllBtn}>
              Visit My Writing Portfolio
              <HiArrowRight className={classes.viewArr} />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogUI;