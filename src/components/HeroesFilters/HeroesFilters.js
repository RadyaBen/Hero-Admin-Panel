import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { store } from '../../redux/helpers/store';
import { 
	filtersChanged, 
	fetchFilters, 
	selectAll 
} from './FiltersSlice';
import { Spinner } from '../Spinner';

const HeroesFilters = () => {

	const { filtersLoadingStatus, activeFilter } = useSelector(state => state.filters);
	const filters = selectAll(store.getState());
	const dispatch = useDispatch();

	// Request to the server to receive filters and sequential change of state 
	useEffect(() => {
		dispatch(fetchFilters());
		// eslint-disable-next-line
	}, []);

	if (filtersLoadingStatus === "loading") {
		return <Spinner />;
	} else if (filtersLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Loading error</h5>
	}

	const renderFilters = (arr) => {
		if (arr.length === 0) {
			return <h5 className="text-center mt-5">Filters not found</h5>
		}

		// We receive the data from json file 
		return arr.map(({ name, className, label }) => {

			// We use the classnames library and form classes dynamically
			const btnClass = classNames('btn', className, {
				'active': name === activeFilter
			});

			return <button
				key={name}
				id={name}
				className={btnClass}
				onClick={() => dispatch(filtersChanged(name))}
			>{label}</button>
		});
	}

	const elements = renderFilters(filters);

	return (
		<div className="card shadow-lg mt-4">
			<div className="card-body">
				<p className="card-text">Filter heroes by element</p>
				<div className="btn-group">
					{elements}
				</div>
			</div>
		</div>
	);
};

export { HeroesFilters };