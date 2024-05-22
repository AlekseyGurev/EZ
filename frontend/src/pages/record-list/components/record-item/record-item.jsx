import styles from './record-item.module.css';

export const RecordItem = ({ date, fio, tel, text }) => {
	return (
		<tr className={styles.container}>
			<td className={styles.tableRow}>{date}</td>
			<td className={styles.tableRow}>{fio}</td>
			<td className={styles.tableRow}>{tel}</td>
			<td className={styles.tableRow}>{text}</td>
		</tr>
	);
};
