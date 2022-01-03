import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createSelector } from 'reselect';

import { heroesFetched, heroesFetchingError, heroDeleted } from '../../redux/actions/index';
import HeroesListItem from "../HeroesListItem/HeroesListItem";
import Spinner from '../Spinner/Spinner';

import './HeroesList.scss';

const HeroesList = () => {

	const filteredHeroesSelector = createSelector(
		[state => state.filters.activeFilter, state => state.heroes.heroes],
		(filter, heroes) => {
			if (filter === 'all') {
				return heroes;
			} else {
				return heroes.filter(item => item.element === filter)
			}
		}
	);

	const filteredHeroes = useSelector(filteredHeroesSelector);
	const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
	const dispatch = useDispatch();
	const { request } = useHttp();

	useEffect(() => {
		dispatch("HEROES_FETCHING");
		request("http://localhost:3001/heroes")
			.then(data => dispatch(heroesFetched(data)))
			.catch(() => dispatch(heroesFetchingError()))
		// eslint-disable-next-line
	}, []);

	const onDeleteHero = useCallback((id) => {
		request(`http://localhost:3001/heroes/${id}`, "DELETE")
			.then(data => console.log(data, 'Deleted'))
			.then(dispatch(heroDeleted(id)))
			.catch(err => console.log(err));
		// eslint-disable-next-line  
	}, [request]);

	if (heroesLoadingStatus === "loading") {
		return <Spinner />;
	} else if (heroesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Loading error</h5>
	}

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return (
				<CSSTransition
					timeout={0}
					classNames="hero">
					<h5 className="text-center mt-5">There are no heroes yet</h5>
				</CSSTransition>
			)
		}

		return arr.map(({ id, ...props }) => {
			return (
				<CSSTransition
					key={id}
					timeout={500}
					classNames="hero">
					<HeroesListItem  {...props} onDeleteHero={() => onDeleteHero(id)} />
				</CSSTransition>
			)
		});
	}

	const elements = renderHeroesList(filteredHeroes);
	return (
		<TransitionGroup component="ul">
			{elements}
		</TransitionGroup>
	)
}

export default HeroesList;