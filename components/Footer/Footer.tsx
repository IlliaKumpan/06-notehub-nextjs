// components/Footer/Footer.tsx
import css from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {currentYear} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Illia</p>
          <p>
            Contact us:
            <a href="mailto:student@notehub.app">IlliaKumpan@notehub.app</a>
          </p>
        </div>
      </div>
    </footer>
  );
};