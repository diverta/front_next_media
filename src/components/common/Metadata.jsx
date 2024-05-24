import { useEffect } from 'react';

const Metadata = ({ title }) => {
  useEffect(() => {
    const currentTitle = document.title;
    if (!currentTitle.startsWith(title + ' | ')) {
      document.title = `${title} | ${currentTitle}`;
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', title);
    }
  }, [title]);

  return <div></div>;
};

export default Metadata;
