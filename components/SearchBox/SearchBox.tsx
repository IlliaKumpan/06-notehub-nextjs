import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string; // Додаємо цей пропс
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className={css.wrapper}>
      <label htmlFor="search" className={css.label}>Search notes</label>
      <input
        id="search"
        className={css.input}
        type="text"
        value={value} // Робимо інпут керованим
        placeholder="Search notes..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}