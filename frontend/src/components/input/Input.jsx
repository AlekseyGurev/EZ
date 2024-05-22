import styles from './Input.module.css';

export const Input = (
  { name, title, register, titleProps, type = 'text', placeholder },
  props
) => {
  return (
    <label id={`${name}`} className={styles.titleInput}>
      {title}
      <input
        {...props}
        placeholder={placeholder}
        type={type}
        className={styles.input}
        name={`${name}`}
        id={`${name}`}
        {...register(`${name}`, titleProps)}
      />
    </label>
  );
};
