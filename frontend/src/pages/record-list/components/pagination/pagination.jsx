import styles from './pagination.module.css';

export const Pagination = ({
	currentPage,
	toFirst,
	toNextPage,
	toPrevPage,
	toLastPage,
	lastPage,
}) => {
	if (lastPage === 0) {
		return null;
	}

	return (
		<div className={styles.container}>
			<button
				disabled={currentPage === 1}
				className={styles.button}
				onClick={() => toFirst()}
			>
				В начало
			</button>
			<button
				disabled={currentPage === 1}
				className={styles.button}
				onClick={() => toPrevPage()}
			>
				Предидущая
			</button>
			<span className="current-page">
				{currentPage} из {lastPage}
			</span>
			<button
				disabled={currentPage === lastPage}
				className={styles.button}
				onClick={() => toNextPage()}
			>
				Следующая
			</button>
			<button
				disabled={currentPage === lastPage}
				className={styles.button}
				onClick={() => toLastPage()}
			>
				В конец
			</button>
		</div>
	);
};

// display: flex;
// gap: 10px;
// align-items: center;

// .button {
// 	padding: 5px 10px;
// }

// .current-page {
// 	border: 1px solid #000000;
// 	border-radius: 4px;
// 	padding: 5px 10px;
// 	font-size: 17px;
// }
