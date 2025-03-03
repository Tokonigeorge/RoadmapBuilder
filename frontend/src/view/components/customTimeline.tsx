import React, {
  Children,
  useLayoutEffect,
  ReactNode,
  HTMLAttributes,
} from 'react';

interface BookmarkProps extends HTMLAttributes<HTMLLIElement> {
  className?: string;
  children: ReactNode;
}

function Bookmark({ className, children, ...restProps }: BookmarkProps) {
  return (
    <li {...restProps} className={`timeline-item ${className || ''}`}>
      {children}
    </li>
  );
}

interface TimelineProps {
  className?: string;
  tip?: boolean;
  children: ReactNode;
}

function Timeline({ className = '', tip = true, children }: TimelineProps) {
  const tipClassName = tip ? 'with-tip' : '';
  const fullClassName = `timeline-wrapper ${tipClassName} ${className}`;
  const numBookmarks = Children.count(children);

  useLayoutEffect(() => {
    let css = '';
    for (let i = 1; i <= numBookmarks; i += 1) {
      css += `.timeline-item:nth-child(${i}) {grid-row: ${i};}`;
    }

    document.head.insertAdjacentHTML(
      'beforeend',
      `<style data-timeline-styles>${css}</style>`
    );

    return () => {
      const styleElement = document.querySelector('[data-timeline-styles]');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [numBookmarks]);

  return (
    <div className={fullClassName}>
      <div className='timeline-connector' />
      <ul className='timeline'>
        {children}
        {Array(numBookmarks)
          .fill(null)
          .map((_, i) => (
            <span key={i} className='timeline-dotmark'>
              <div className='timeline-dot' />
            </span>
          ))}
      </ul>
    </div>
  );
}

export { Timeline, Bookmark };
